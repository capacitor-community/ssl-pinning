import { WebPlugin } from '@capacitor/core';

import type { SSLPinningPlugin } from './definitions';

export class SSLPinningWeb extends WebPlugin implements SSLPinningPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
