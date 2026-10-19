<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">SSL Pinning</h3>
<p align="center"><strong><code>@capacitor-community/ssl-pinning</code></strong></p>
<p align="center">
  Provide SSL pinning for Capacitor Native HTTP Plugin
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2026?style=flat-square" />
  <a href="https://www.npmjs.com/package/@capacitor-community/ssl-pinning"><img src="https://img.shields.io/npm/l/@capacitor-community/ssl-pinning?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor-community/ssl-pinning"><img src="https://img.shields.io/npm/v/@capacitor-community/ssl-pinning?style=flat-square" /></a>
</p>

## Maintainers

| Maintainer | GitHub | Social |
| -----------| -------| -------|
| Capacitor Community | [capacitor-community](https://github.com/capacitor-community) | |

## Documentation

- [Overview](docs/overview.md)
- [Installation](docs/installation.md)
- [Configuration](docs/configuration.md)
- [Usage](docs/usage.md)

## Installation

```bash
npm install @capacitor-community/ssl-pinning
npx cap sync
```

## Demo

A working example can be found in the [example-app](./example-app) directory.

## API

<docgen-index>



</docgen-index>

## Configuration

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

These config values are available:

| Prop                  | Type                  | Description                                                                                                                       | Since |
| --------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`certs`**           | <code>string[]</code> | Paths to your SSL Certificates relative to the root of your project. *Your Primary Cert. should be the first entry*               | 1.0.0 |
| **`excludedDomains`** | <code>string[]</code> | Domains to exclude from SSL Pinning when making requests. Domains should be be fully qualified domains that include the protocol. | 1.1.0 |

### Examples

In `capacitor.config.json`:

```json
{
  "plugins": {
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
    SSLPinning: {
      certs: ["sslCerts/productionCerts/primary.cer", "sslCerts/productionCerts/backup.cer"],
      excludedDomains: ["https://analytics.google.com, https://myapi.com/subpath"],
    },
  },
};

export default config;
```

</docgen-config>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->



</docgen-api>
