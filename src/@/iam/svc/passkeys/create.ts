import * as passkeys from '@/passkeys'
import * as origin from '../net'
import { method, iam } from '../store'

export async function create(name: string): Promise<void | Error> {
  const response = await passkeys.create(name)

  if (response instanceof Error) {
    console.error('Credential creation failed', response)

    return response
  }

  const echo = await origin.passkeys.post(response.identity, response.key)

  if (echo instanceof Error) {
    console.error('Credential registration failed', echo)

    return echo
  }

  iam(echo)
  method.set('passkey')
}
