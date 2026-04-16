import * as origin from './net'
import * as credentials from './credentials'

export async function request(id?: string): Promise<origin.RequestResponse | Error> {
  const options = await origin.challenges.post('request', id)

  if (options instanceof Error) return options

  const start = Date.now()
  const credential = await credentials.get(options).catch((e) => e as Error)

  if (credential instanceof Error) {
    // multi-device authentication is not implemented on Android,
    // so it just returns NotAllowedError instantly
    if (credential.name === 'NotAllowedError' && Date.now() - start < 50)
      return new NotAllowedQuicklyError()

    return credential
  }

  if (credential === null) return new Error('No credential given')

  return toRequestResponse(credential)
}

function toRequestResponse(credential: PublicKeyCredential): origin.RequestResponse {
  const response = credential.response as AuthenticatorAssertionResponse

  return {
    id: credential.id,
    type: credential.type,
    response: {
      authenticatorData: credentials.bufferToBase64url(response.authenticatorData),
      clientDataJSON: credentials.bufferToBase64url(response.clientDataJSON),
      signature: credentials.bufferToBase64url(response.signature),
      userHandle:
        response.userHandle === null ? null : credentials.bufferToBase64url(response.userHandle),
    },
    authenticatorAttachment: credential.authenticatorAttachment,
    clientExtensionResults: credential.getClientExtensionResults(),
  }
}

export class NotAllowedQuicklyError extends Error {
  constructor() {
    super()

    this.name = this.constructor.name
  }
}
