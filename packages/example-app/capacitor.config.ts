import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'example-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
		CapacitorCookies: {
			enabled: true
		},
		CapacitorHttp: {
			enabled: true
		},
    SSLPinning: {
      certs: [
        "testCerts/ionic.io.cer",
        // "testCerts/typicode.com.cer" // Un-comment this to have the app succeed at making the request.
      ]
    }
  }
};

export default config;
