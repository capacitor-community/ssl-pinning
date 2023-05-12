# @ionic-enterprise/ssl-pinning

Provide SSL pinning for Capacitor Native HTTP Plugin

## Install

```bash
npm install @ionic-enterprise/ssl-pinning
npx cap sync
```

## API

<docgen-index>



</docgen-index>

## Configuration

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

These config values are available:

| Prop        | Type                  | Description                                                                                                         | Since |
| ----------- | --------------------- | ------------------------------------------------------------------------------------------------------------------- | ----- |
| **`certs`** | <code>string[]</code> | Paths to your SSL Certificates relative to the root of your project. *Your Primary Cert. should be the first entry* | 1.0.0 |

### Examples

In `capacitor.config.json`:

```json
{
  "plugins": {
    "SSLPinning": {
      "certs": ["sslCerts/productionCerts/primary.cer", "sslCerts/productionCerts/backup.cer"]
    }
  }
}
```

In `capacitor.config.ts`:

```ts
/// <reference types="@capacitor/sslpinning" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    SSLPinning: {
      certs: ["sslCerts/productionCerts/primary.cer", "sslCerts/productionCerts/backup.cer"],
    },
  },
};

export default config;
```

</docgen-config>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->



</docgen-api>
