import Foundation
import Capacitor

@objc(SSLPinningHttpRequestHandlerClass)
class SSLPinningHttpRequestHandlerClass: NSObject {
    @objc class func request(_ params: [String: Any]) {
        guard let call = params["call"] as? CAPPluginCall else { fatalError("No Plugin Call") }
        
        let httpMethod = params["httpMethod"] as? String
        let config = params["config"] as? InstanceConfiguration
        
        do {
            try SSLPinningHttpRequestHandler.sslRequest(call, httpMethod, config)
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }
}

public class SSLPinningHttpRequestHandler: HttpRequestHandler {
    public class SSLCapacitorHttpRequestBuilder: CapacitorHttpRequestBuilder {
        override init() {
            super.init();
        }
        
        public override func openConnection() -> CapacitorHttpRequestBuilder {
            request = SSLCapacitorUrlRequest(url!, method: method!)
            return self
        }
    }
    
    public static func sslRequest(_ call: CAPPluginCall, _ httpMethod: String?, _ config: InstanceConfiguration?) throws {
        guard let urlString = call.getString("url")?.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) else { throw URLError(.badURL) }
        let method = httpMethod ?? call.getString("method", "GET")
        
        // swiftlint:disable force_cast
        let headers = (call.getObject("headers") ?? [:]) as! [String: String]
        let params = (call.getObject("params") ?? [:]) as [String: Any]
        let responseType = call.getString("responseType") ?? "text"
        let connectTimeout = call.getDouble("connectTimeout")
        let readTimeout = call.getDouble("readTimeout")
        
        let request = try SSLCapacitorHttpRequestBuilder()
            .setUrl(urlString)
            .setMethod(method)
            .setUrlParams(params)
            .openConnection()
            .build() as! SSLCapacitorUrlRequest
        
        request.setRequestHeaders(headers)
        
        let timeout = (connectTimeout ?? readTimeout ?? 600000.0) / 1000.0
        request.setTimeout(timeout)
        
        if let data = call.options["data"] as? JSValue {
            do {
                try request.setRequestBody(data)
            } catch {
                call.reject(error.localizedDescription, (error as NSError).domain, error, nil)
                return
            }
        }
        
        let urlRequest = request.getUrlRequest()
        let urlSession = request.getSSLUrlSession(call, config)
        let task = urlSession.dataTask(with: urlRequest, completionHandler: {(data, response, error) -> Void in
            if let error = error {
                call.reject(error.localizedDescription, (error as NSError).domain, error, nil)
                return
            }
            
            setCookiesFromResponse(response as! HTTPURLResponse, config)
            
            let type = ResponseType(rawValue: responseType) ?? .default
            call.resolve(self.buildResponse(data, response as! HTTPURLResponse, responseType: type))
        })
        
        task.resume()
    }
}

struct CertListEntry {
    var fileName = ""
    var extensionOfFile = ""
}

class URLSessionPinningDelegate: NSObject, URLSessionDelegate {
    var cfg: InstanceConfiguration? = nil
    
    init(_ config: InstanceConfiguration?) {
        self.cfg = config
        super.init()
    }
    
    
    func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        guard
            challenge.protectionSpace.authenticationMethod == NSURLAuthenticationMethodServerTrust,
            let serverTrust = challenge.protectionSpace.serverTrust
        else {
            completionHandler(URLSession.AuthChallengeDisposition.cancelAuthenticationChallenge, nil)
            return
        }
        
        guard let config = self.cfg else {
            fatalError("No config set up.")
        }
        
        let certArray = config.getPluginConfig("SSLPinning").getArray("certs")
        guard let certArray = certArray else {
            fatalError("No Certs array in config")
        }
        print(certArray)
        var certList: [CertListEntry] = []
        for pathOfCert in certArray {
            var entry = CertListEntry()
            let file = URL(fileURLWithPath: pathOfCert as! String)
            entry.fileName = file.deletingPathExtension().lastPathComponent
            entry.extensionOfFile = file.pathExtension
            certList.append(entry)
        }
        
        for certEntry in certList {
            print("Trying " + certEntry.fileName)
            if tryCert(certEntry, challenge, serverTrust) {
                completionHandler(URLSession.AuthChallengeDisposition.useCredential,
                                  URLCredential(trust:serverTrust))
                return
            }
        }
        completionHandler(URLSession.AuthChallengeDisposition.cancelAuthenticationChallenge, nil)
        return
    }
    
    private func tryCert(_ cert: CertListEntry, _ challenge: URLAuthenticationChallenge, _ serverTrust: SecTrust) -> Bool {
        let filePath = Bundle.main.path(forResource: cert.fileName, ofType: cert.extensionOfFile, inDirectory: "public/certs")!
        let data = try! Data(contentsOf: URL(fileURLWithPath: filePath))
        let certificate = SecCertificateCreateWithData(nil, data as CFData)
        guard let certificate = certificate else {
            return false
        }
        
        guard
            self.validate(trust: serverTrust, with: SecPolicyCreateBasicX509()),
            let serverCertificate = SecTrustGetCertificateAtIndex(serverTrust, 0)
        else {
            return false
        }
        
        let serverCertKey = self.publicKey(for: serverCertificate)
        let bundledCertKey = self.publicKey(for: certificate)
        if serverCertKey != bundledCertKey {
            return false
        }
        
        return true
    }
    
    private func validate(trust: SecTrust, with policy: SecPolicy) -> Bool {
        let status = SecTrustSetPolicies(trust, policy)
        guard status == errSecSuccess else { return false }
        
        return SecTrustEvaluateWithError(trust, nil)
    }
    
    private func publicKey(for certificate: SecCertificate) -> SecKey? {
        var publicKey: SecKey?
        
        var trust: SecTrust?
        let trustCreationStatus = SecTrustCreateWithCertificates(certificate, SecPolicyCreateBasicX509(), &trust)
        
        if let trust = trust, trustCreationStatus == errSecSuccess {
            publicKey = SecTrustCopyPublicKey(trust)
        }
        
        return publicKey
    }
    
}

public class SSLCapacitorUrlRequest: CapacitorUrlRequest {
    
    public func getSSLUrlSession(_ call: CAPPluginCall, _ config: InstanceConfiguration?) -> URLSession {
        return URLSession(
            configuration: URLSessionConfiguration.default,
            delegate: URLSessionPinningDelegate(config),
            delegateQueue: nil
        )
    }
    
    
}

@objc(SSLPinningPlugin)
public class SSLPinningPlugin: CAPPlugin { }
