import { value } from 'svas'
import { GOOGLE_CLIENT_ID, APPLE_CLIENT_ID } from '$config'
import { method } from './store'

export const nonce = value<string>({
  persist: 'auth:oidc:nonce',
})

export function oidc(idp: IDP) {
  const { client, endpoint, type, scope } = providers[idp]

  const id = newid()

  const params = new URLSearchParams({
    client_id: client,
    redirect_uri: window.location.origin + '/',
    response_type: type,
    response_mode: 'fragment',
    scope,
    state: btoa(JSON.stringify({ idp })),
    nonce: id,
  })

  nonce.set(id)
  method.set(idp)
  window.location.href = endpoint + '?' + params
}

export function supported(idp: IDP): boolean {
  return providers[idp].client !== ''
}

export const providers: Record<IDP, Descriptor> = {
  apple: {
    iss: 'https://appleid.apple.com',
    endpoint: 'https://appleid.apple.com/auth/authorize',
    type: 'code',
    scope: 'openid',
    client: APPLE_CLIENT_ID,
  },
  google: {
    iss: 'https://accounts.google.com',
    endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    type: 'id_token',
    scope: 'openid profile',
    client: GOOGLE_CLIENT_ID,
  },
} as const

export function newid() {
  return window.crypto?.randomUUID?.() ?? Math.random().toString(16).slice(2)
}

interface Descriptor {
  iss: string
  endpoint: string
  type: 'id_token' | 'code'
  scope: string
  client: string
}

export type IDP = 'google' | 'apple'
