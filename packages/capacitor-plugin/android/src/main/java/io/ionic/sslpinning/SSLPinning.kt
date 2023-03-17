package io.ionic.sslpinning

import com.getcapacitor.Bridge
import java.io.InputStream
import java.security.KeyStore
import java.security.cert.CertificateFactory
import javax.net.ssl.SSLContext
import javax.net.ssl.SSLSocketFactory
import javax.net.ssl.TrustManagerFactory

class SSLPinning {
    fun getSSLSocketFactory(bridge: Bridge): SSLSocketFactory? {
        try {
            val certs = getSSLCerts(bridge)
            if (certs.isNotEmpty()) {
                val keyStore = getKeyStoreInstance(certs)
                val trustManagerFactory = getTrustManagerFactoryInstance(keyStore)
                val sslContext = SSLContext.getInstance("TLS")
                sslContext.init(null, trustManagerFactory.trustManagers, null)
                return sslContext.socketFactory
            }
        } catch (ignored: Exception) {
        }
        return null
    }

    @Throws(Exception::class)
    private fun getSSLCerts(bridge: Bridge): Map<String, InputStream> {
        val certs = mutableMapOf<String, InputStream>()
        val assetManager = bridge.context.resources.assets
        val assetFiles = assetManager.list("certs")
        val fileList = bridge.config.getPluginConfiguration("SSLPinning").getArray("certs")
        for (file in fileList) {
            val filename = file.split("/").last()
            if (filename.endsWith(".cer") && assetFiles!!.contains(filename)) {
                certs[filename.split(".cer").first()] = assetManager.open("certs/$filename")
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
}