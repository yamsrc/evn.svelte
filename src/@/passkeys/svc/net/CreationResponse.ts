export interface CreationResponse {
  id: string
  type: string
  response: {
    attestationObject: string
    clientDataJSON: string
    authenticatorData: string
    transports: string[]
    publicKeyAlgorithm: number
    publicKey: string
  }
  authenticatorAttachment: string | null
  clientExtensionResults: AuthenticationExtensionsClientOutputs
  label?: string
}
