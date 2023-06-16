package io.ionic.sslpinning

import android.annotation.SuppressLint
import android.util.Base64
import android.util.Log
import com.getcapacitor.Bridge
import java.io.InputStream
import java.net.URL
import java.security.KeyStore
import java.security.cert.CertificateException
import java.security.cert.CertificateFactory
import java.security.cert.X509Certificate
import javax.net.ssl.SSLContext
import javax.net.ssl.SSLSocketFactory
import javax.net.ssl.TrustManager
import javax.net.ssl.TrustManagerFactory
import javax.net.ssl.X509TrustManager

class SSLPinning {
    private val tag = "SSL PINNING"

    fun getSSLSocketFactory(bridge: Bridge): SSLSocketFactory? {
        try {
            val certs = getSSLCerts(bridge)
            if (certs.isNotEmpty()) {
                val keyStore = getKeyStoreInstance(certs)
                val trustManagerFactory = getTrustManagerFactoryInstance(keyStore)
                val sslContext = SSLContext.getInstance("TLS")
                val pinnedPublicKeys = getPublicKeys(keyStore)
                sslContext.init(null, arrayOf(PublicKeyTrustManager(trustManagerFactory.trustManagers, pinnedPublicKeys)), null)
                return sslContext.socketFactory
            }
            else {
                Log.w(tag, "Unable to successfully load any certs. SSL Pinning will be disabled for this request.")
            }
        } catch (e: Exception) {
            Log.e(tag, e.message ?: "Unhandled Exception")
            e.printStackTrace()
        }
        return null
    }

    fun isDomainExcluded(bridge: Bridge, url: URL): Boolean {
        val excludedDomains = bridge.config.getPluginConfiguration("SSLPinning")
            .getArray("excludedDomains")

        if(null == excludedDomains || excludedDomains.isEmpty())   return false

        Log.i(tag, "Checking Excluded Domains: [${excludedDomains.joinToString(", ")}]")

        val isExcluded = excludedDomains.any { domain ->
            val excludedDomainUrl: URL? = try { URL(domain) } catch (ignored: Exception) { null }

            if (excludedDomainUrl == null) {
                Log.w(tag, "Invalid URL in Excluded Domains: $domain")
                false
            } else if (excludedDomainUrl.protocol.isNullOrEmpty()) {
                println("The excluded domain string needs to include a protocol: $domain")
                false
            } else {
                excludedDomainUrl.host == url.host && excludedDomainUrl.protocol ==url.protocol
            }
        }

        if(isExcluded) {
            Log.i(tag,"Domain Excluded from SSL Pinning. Performing normal request.")
        }
        else {
            Log.i(tag, "Domain Not Excluded from SSL Pinning.")
        }
        return isExcluded
    }

    @Throws(Exception::class)
    private fun getSSLCerts(bridge: Bridge): Map<String, InputStream> {
        val certs = mutableMapOf<String, InputStream>()
        val assetManager = bridge.context.resources.assets
        val fileList = bridge.config.getPluginConfiguration("SSLPinning").getArray("certs")
        Log.i(tag, "Pinning certs from config: [${fileList.joinToString(", ")}]")
        for (file in fileList) {
            val filename = file.split("/").last()

            try {
                certs[filename.substringBeforeLast(".")] = assetManager.open("certs/$filename")
            }
            catch(ignored: Exception) {
                Log.e(tag, "Failed to find cert file in assets: (certs/$filename)")
            }
        }
        return certs.toMap()
    }

    @Throws(Exception::class)
    private fun getKeyStoreInstance(certs: Map<String, InputStream>): KeyStore {
        val keyStore = KeyStore.getInstance(KeyStore.getDefaultType())
        keyStore.load(null)
        val certificateFactory = CertificateFactory.getInstance("X.509")
        for (cert in certs) {
            val certificate = certificateFactory.generateCertificate(cert.value)
            keyStore.setCertificateEntry("ionic-enterprise-ssl-pinning-" + cert.key, certificate)
        }
        return keyStore
    }

    @Throws(Exception::class)
    private fun getTrustManagerFactoryInstance(keyStore: KeyStore): TrustManagerFactory {
        val trustManagerFactory =
            TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm())
        trustManagerFactory.init(keyStore)
        return trustManagerFactory
    }

    private fun getPublicKeys(keyStore: KeyStore): List<String> {
        return keyStore.aliases().toList().map { alias ->
            val cert = keyStore.getCertificate(alias) as? X509Certificate
            Base64.encodeToString(cert?.publicKey?.encoded, Base64.NO_WRAP)
        }
    }

    @SuppressLint("CustomX509TrustManager")
    inner class PublicKeyTrustManager(private val defaultTrustManagers: Array<TrustManager>, private val pinnedPublicKeys: List<String>) : X509TrustManager {
        override fun getAcceptedIssuers(): Array<X509Certificate> {
            return (defaultTrustManagers[0] as X509TrustManager).acceptedIssuers
        }

        override fun checkClientTrusted(chain: Array<X509Certificate>, authType: String) {
            (defaultTrustManagers[0] as X509TrustManager).checkClientTrusted(chain, authType)
        }

        override fun checkServerTrusted(chain: Array<X509Certificate>, authType: String) {
            val serverPublicKey = Base64.encodeToString(chain[0].publicKey.encoded, Base64.NO_WRAP)
            if (pinnedPublicKeys.none { it == serverPublicKey }) {
                throw CertificateException("Server's public key is not in the list of pinned keys")
            }
        }
    }
}