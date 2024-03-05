---
title: Installation
sidebar_label: Installation
---

## Installation

If you have not already setup Ionic Enterprise in your app, [follow the one-time setup steps](https://ionic.io/docs/enterprise-starter/enterprise-key).

Next, install the plugin:

### Capacitor

```sh
npm install @ionic-enterprise/ssl-pinning
npx cap sync
```

:::note
This plugins requires `@capacitor/cli@5.7.1` or later for certificates not using the `.cer` extension. If you are using an earlier version of `@capacitor/cli`, you will need to use `.cer` formated certificates.
:::

### Capacitor Configuration

In order to enable SSL pinning, you need to setup your Capacitor configuration to enable network requests to be routed through the `CapacitorHttp` plugin and configure the path to your certificates.

See [Configuration](/configuration) for more information.
