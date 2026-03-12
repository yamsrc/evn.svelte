import { key } from './key'
import { base64urlToArrayBuffer } from './convert'
import type { RequestOptions } from '../net/challenges'

export async function get(options: RequestOptions): Promise<PublicKeyCredential | null> {
  const publicKey: PublicKeyCredentialRequestOptions = {
    timeout: options.timeout,
    challenge: base64urlToArrayBuffer(options.challenge),
    allowCredentials: options.allowCredentials.map(key),
    userVerification: options.userVerification,
  }

  return (await navigator.credentials.get({ publicKey })) as PublicKeyCredential
}
