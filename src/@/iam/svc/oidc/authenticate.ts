import * as net from '../net'
import { method, iam } from '../store'
import { apple } from './apple'
import { google } from './google'
import { providers, type Descriptor, type IDP } from './providers'
import { standard } from './standard'

const vendors = { apple, google } as const

export async function authenticate(idp: IDP) {
  method.set(idp)

  const auth = (vendors[idp] ?? standard) as Authenticate
  const descriptor = providers[idp]

  const code = await auth(descriptor, idp)

  if (code instanceof Error) {
    console.error('Authentication failed', code)

    return code
  }

  if (code === undefined) // redirect flow, see `hello.ts`
    return

  const data = {
    code,
    iss: descriptor.iss,
    for: window.location.origin + window.location.pathname,
  }

  const credentials = btoa(JSON.stringify(data))
  const echo = await net.get('Code ' + credentials)

  if (echo instanceof Error) return echo

  iam(echo)
}

type Authenticate = (descriptor: Descriptor, idp: IDP) => Promise<string | Error | undefined>
