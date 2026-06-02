import { request } from '@/passkeys'
import { track } from '@/ga'
import { method, iam } from '../store'
import { passkeys } from '../net'

export async function login(id?: string): Promise<void | Error> {
  const response = await request(id)

  if (response instanceof Error) {
    console.error('Credential request failed', response)

    return response
  }

  const echo = await passkeys.post(response)

  if (echo instanceof Error) {
    console.error('Credential verification failed', echo)

    return echo
  }

  iam(echo)
  method.set('passkey')
  track('accounts.authenticated', { method: 'passkey' })
}
