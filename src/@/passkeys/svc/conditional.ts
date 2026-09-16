import { supported } from './supported'

/**
 * Whether the browser can show passkeys in the input autofill
 * instead of a modal dialog (`mediation: 'conditional'`).
 */
export async function conditional(): Promise<boolean> {
  if (!supported) return false

  if (PublicKeyCredential.getClientCapabilities !== undefined) {
    const capabilities = await PublicKeyCredential.getClientCapabilities()

    return capabilities.conditionalGet === true
  }

  if (PublicKeyCredential.isConditionalMediationAvailable !== undefined)
    return await PublicKeyCredential.isConditionalMediationAvailable()

  return false
}
