interface CommonOptions {
  identity: string
  challenge: string
  timeout: number
}

export interface CreationOptions extends CommonOptions {
  authenticatorSelection?: Pick<AuthenticatorSelectionCriteria, 'userVerification' | 'residentKey'>
  pubKeyCredParams: PublicKeyCredentialParameters[]
  excludeCredentials: KeyDescriptor[]
}

export interface RequestOptions extends CommonOptions {
  allowCredentials: KeyDescriptor[]
  userVerification: UserVerificationRequirement
}

export interface KeyDescriptor {
  id: string
  transports: AuthenticatorTransport[]
}
