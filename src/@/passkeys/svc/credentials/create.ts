import { key } from './key'
import { base64urlToArrayBuffer, stringToArrayBuffer } from './convert'
import type { CreationOptions } from '../net/challenges'

export async function create(
  user: User,
  options: CreationOptions,
): Promise<PublicKeyCredential | null | Error> {
  const publicKey: PublicKeyCredentialCreationOptions = {
    challenge: base64urlToArrayBuffer(options.challenge),
    timeout: options.timeout,
    authenticatorSelection: options.authenticatorSelection,
    pubKeyCredParams: options.pubKeyCredParams,
    rp: {
      name: 'app',
    },
    user: {
      id: stringToArrayBuffer(user.id),
      name: user.name,
      displayName: user.name,
    },
    excludeCredentials: options.excludeCredentials.map(key),
  }

  return (await navigator.credentials.create({ publicKey }).catch((e) => e as Error)) as
    | PublicKeyCredential
    | null
    | Error
}

interface User {
  id: string
  name: string
}
