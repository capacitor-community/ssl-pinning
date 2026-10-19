---
title: Usage
sidebar_label: Usage
---

The plugin verifies your configured certificate(s) when you make HTTPS calls using [Capacitor HTTP](https://capacitorjs.com/docs/apis/http).

If the certificate presented by the server does not match **one** in the certificate list then the call will fail. You will typically handle this by alerting the user and stopping any further API calls.

## Example
```typescript
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

...

try {
   const response: HttpResponse = await CapacitorHttp.get(
       { url: 'https://mycompany.com/url'});
   // Do your work on response.data
} catch (error: any) {
   if ((error?.code == 'SSLHandshakeException') || (error?.code == 'NSURLErrorDomain')) {
      // The Servers certificate is not valid
      } else {
        // Some other failure occurred
      }
}
```


### Errors
On Android, if the certificate does not match the error will be:
```json
{"code":"SSLHandshakeException"}
```

On iOS, if the certificate does not match the error will be:
```json
{"code":"NSURLErrorDomain","errorMessage":"cancelled"}
```