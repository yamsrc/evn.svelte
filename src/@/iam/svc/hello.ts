import { goto } from '$app/navigation'
import { resolve } from '$app/paths'
import { navigation } from '$config'
import { fragment, query, convert, assert } from '$lib/tools'
import * as accounts from '@/iam/svc/net'
import { logout } from './logout'
import { nonce, providers, type IDP } from './oidc'
import { account, challenge, greeting } from './store'

export async function hello() {
  const authorization = token() ?? bearer() ?? code()

  nonce.set(null)

  if (authorization === null) return

  logout()
  greeting.set(true)

  const echo = await accounts.get(authorization)

  if (echo instanceof Error) {
    challenge.set(null)
    account.set(null)
  } else {
    account.set(echo)

    if (navigation?.entry !== window.location.pathname)
      await goto(resolve(navigation.entry), { replaceState: true })
  }

  greeting.set(false)
}

function token(): string | null {
  const base64url = fragment('challenge')

  if (base64url === null) return null
  else return convert.fromBase64Url(base64url)
}

function bearer(): string | null {
  const token = fragment('id_token')

  if (token === null) return null

  const stored = nonce.extract()
  const payload = JSON.parse(atob(token.split('.')[1])) as { nonce: string }

  if (stored === null || payload.nonce !== stored) {
    console.error('Nonce mismatch')

    return null
  }

  return 'Bearer ' + token
}

function code(): string | null {
  // Google only passes code in a query string
  const code = query('code') ?? fragment('code')
  const state = query('state') ?? fragment('state')

  if (code === null) return null

  assert(typeof state === 'string', 'State is required')

  const { idp } = JSON.parse(atob(state)) as { idp: IDP }
  const provider = providers[idp]

  assert(provider !== undefined, 'Unknown IDP')

  const auth = {
    code,
    iss: providers[idp].iss,
    for: window.location.origin + window.location.pathname,
  }

  const credentials = btoa(JSON.stringify(auth))

  return 'Code ' + credentials
}
