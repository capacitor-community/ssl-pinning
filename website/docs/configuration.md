---
title: Configuration
sidebar_label: Configuration
---

### Configuration

These config values are available:

| Prop        | Type                  | Description                                                                                                         | Since |
| ----------- | --------------------- | ------------------------------------------------------------------------------------------------------------------- | ----- |
| **`certs`** | <code>string[]</code> | Paths to your SSL Certificates relative to the root of your project. *Your Primary Cert. should be the first entry* | 1.0.0 |

### Examples

In `capacitor.config.json`:

```json
{
  "plugins": {
    "CapacitorHttp": {
      "enabled": true,
    },
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
    CapacitorHttp: {
      enabled: true,
    },
    SSLPinning: {
      certs: ["sslCerts/productionCerts/primary.cer", "sslCerts/productionCerts/backup.cer"],
    },
  },
};

export default config;
```