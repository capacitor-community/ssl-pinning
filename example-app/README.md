# Example App Configuration

This example app demonstrates the SSL Pinning plugin on iOS and Android.

## Setup

The demo uses public test endpoints and certificates — no credentials required.

- Test endpoint: `https://jsonplaceholder.typicode.com/posts/1`
- Pinned certificates in `testCerts/`:
  - `ionic.io.cer`
  - `typicode.com.cer`

The default config (`capacitor.config.ts`) pins the `ionic.io` certificate. Requests to any other domain will **fail SSL validation** unless added to `excludedDomains`.

To make the demo request succeed, uncomment the `typicode.com.cer` entry in `capacitor.config.ts` so the certificate chain validates.

## Run

```bash
npm install
npm run build
npx cap sync
npx cap open ios        # or: npx cap open android
```

Then build & run on a physical device or simulator from Xcode / Android Studio.

Try switching the implementation (`FETCH` / `XHR` / `CAPACITOR`) and the URL in the app to verify pinning behavior across different HTTP clients.
