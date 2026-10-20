---
title: Configuration
sidebar_label: Configuration
---

## Configuration

These config values are available:

| Prop                  | Type                  | Description                                                                                                                       | Since |
| --------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`certs`**           | <code>string[]</code> | Paths to your SSL Certificates relative to the root of your project. | 1.0.0 |
| **`excludedDomains`** | <code>string[]</code> | Domains to exclude from SSL Pinning when making requests. Domains should be be fully qualified domains that include the protocol. | 1.1.0 |

If any **one** of the certificates matches then the HTTPS call will succeed. You can use feature when you replace certificates on the server by including both the expiring certificate and the new certificate in the list.

## Examples

In `capacitor.config.json`:

```json
{
  "plugins": {
    "CapacitorHttp": {
      "enabled": true,
    },
    "SSLPinning": {
      "certs": ["sslCerts/productionCerts/primary.cer", "sslCerts/productionCerts/backup.cer"],
      "excludedDomains": ["https://analytics.google.com, https://myapi.com/subpath"]
    }
  }
}
```

In `capacitor.config.ts`:

```ts
/// <reference types="@capacitor-community/ssl-pinning" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    SSLPinning: {
      certs: ["sslCerts/productionCerts/primary.cer", "sslCerts/productionCerts/backup.cer"],
      excludedDomains: ["https://analytics.google.com, https://myapi.com/subpath"],
    },
  },
};

export default config;
```

## Extracting Certificates



You can obtain the certificate file using `openssl` using this command: *(replace `[domain]` with the domain name for your server. eg `mycompany.com`)*
```bash
openssl s_client -connect [domain]:443 -showcerts </dev/null 2>/dev/null | openssl x509 -outform DER > certificate.der
```

This creates a file called `certificate.der` which openssl created by reviewing the certificate at `https://[domain]`. You can copy this certificate file into your project.
