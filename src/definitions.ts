/// <reference types="@capacitor/cli" />
declare module '@capacitor/cli' {
  export interface PluginsConfig {
    /**
     * These config values are available:
     */
    SSLPinning?: {
      /**
       * Paths to your SSL Certificates relative to the root of your project.
       * *Your Primary Cert. should be the first entry*
       *
       * @since 1.0.0
       * @example ["sslCerts/productionCerts/primary.cer", "sslCerts/productionCerts/backup.cer"]
       */
      certs?: string[];
      /**
       * Domains to exclude from SSL Pinning when making requests.
       * Domains should be be fully qualified domains that include the protocol.
       *
       * @since 1.1.0
       * @example ["https://analytics.google.com, https://myapi.com/subpath"]
       */
      excludedDomains?: string[];
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SSLPinningPlugin {}
