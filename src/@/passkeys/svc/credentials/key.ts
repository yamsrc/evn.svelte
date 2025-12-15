import { base64urlToArrayBuffer } from './convert'
import type { KeyDescriptor } from '../net/challenges'

export function key({ id, transports }: KeyDescriptor): PublicKeyCredentialDescriptor {
  return {
    id: base64urlToArrayBuffer(id),
    type: 'public-key',
    transports,
  }
}
