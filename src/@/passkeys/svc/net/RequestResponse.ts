export interface RequestResponse {
  id: string
  type: string
  response: {
    clientDataJSON: string
    authenticatorData: string
    signature: string
    userHandle?: string | null
  }
  authenticatorAttachment: string | null
  clientExtensionResults: AuthenticationExtensionsClientOutputs
}
