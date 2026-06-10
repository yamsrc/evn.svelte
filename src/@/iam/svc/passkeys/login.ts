import { request } from '@/passkeys'
import { method, iam } from '../store'
import { passkeys } from '../net'

export async function login(
  id?: string,
  init?: Pick<CredentialRequestOptions, 'mediation' | 'signal'>,
): Promise<void | Error> {
  const response = await request(id, init)

  if (response instanceof Error) {
    // aborting a conditional request is a normal flow
    if (response.name !== 'AbortError') console.error('Credential request failed', response)

    return response
  }

  const echo = await passkeys.post(response)

  if (echo instanceof Error) {
    console.error('Credential verification failed', echo)

    return echo
  }

  iam(echo)
  method.set('passkey')
}
