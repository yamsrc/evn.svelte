import * as origin from './net'
import * as credentials from './credentials'

export async function create(name: string, identity?: string): Promise<Output | Error> {
  const options = await origin.challenges.post('creation', identity)

  if (options instanceof Error)
    return options

  const credential = await credentials.create({ id: options.identity, name }, options)

  if (credential instanceof Error)
    return credential

  if (credential === null)
    throw new Error('No credential is created')

  return {
    key: toCreationResponse(credential, name),
    identity: options.identity,
  }
}

function toCreationResponse(
  credential: PublicKeyCredential,
  label: string,
): origin.CreationResponse {
  const response = credential.response as AuthenticatorAttestationResponse
  const authenticatorData = response.getAuthenticatorData()
  const transports = response.getTransports()
  const publicKeyAlgorithm = response.getPublicKeyAlgorithm()
  const publicKey = response.getPublicKey()
  const clientExtensionResults = credential.getClientExtensionResults()

  if (publicKey === null)
    throw new Error('No public key is created')

  return {
    id: credential.id,
    type: credential.type,
    response: {
      attestationObject: credentials.bufferToBase64url(response.attestationObject),
      clientDataJSON: credentials.bufferToBase64url(response.clientDataJSON),
      authenticatorData: credentials.bufferToBase64url(authenticatorData),
      transports,
      publicKeyAlgorithm,
      publicKey: credentials.bufferToBase64url(publicKey),
    },
    authenticatorAttachment: credential.authenticatorAttachment,
    clientExtensionResults,
    label,
  }
}

interface Output {
  key: origin.CreationResponse
  identity: string
}
