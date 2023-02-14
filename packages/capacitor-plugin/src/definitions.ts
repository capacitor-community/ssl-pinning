/// <reference types="@capacitor/cli" />
declare module '@capacitor/cli' {
  export interface PluginsConfig {
    SSLPinning?: {
      /**
       * Paths to your SSL Certificates relative to the root of your project.
       * *Your Primary Cert. should be the first entry*
       *
       * @since 1.0.0
       * @example ["sslCerts/productionCerts/primary.cer", "sslCerts/productionCerts/backup.cer"]
       */
      certs?: string[];
    };
  }
}

export interface SSLPinningPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
