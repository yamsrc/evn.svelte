import { nonce } from './nonce'
import type { Descriptor, IDP } from './providers'

export function standard(descriptor: Descriptor, idp: IDP) {
  const { client, endpoint, type, scope } = descriptor
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
  window.location.href = endpoint + '?' + params
}

function newid() {
  return window.crypto?.randomUUID?.() ?? Math.random().toString(16).slice(2)
}
