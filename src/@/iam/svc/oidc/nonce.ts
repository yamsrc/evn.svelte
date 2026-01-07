import { value } from 'svas'

export const nonce = value<string>({
  persist: 'auth:oidc:nonce',
})
