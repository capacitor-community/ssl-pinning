import { WebPlugin } from '@capacitor/core';

import type { SSLPinningPlugin } from './definitions';

export class SSLPinningWeb extends WebPlugin implements SSLPinningPlugin {}
