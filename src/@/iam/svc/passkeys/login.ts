import { request } from '@/passkeys'
import { method, iam } from '../store'
import { passkeys } from '../net'
import { expectation, mount } from './mount'

export async function login(
  id?: string,
  init?: Pick<CredentialRequestOptions, 'mediation' | 'signal'>,
): Promise<void | Error> {
  const mounted = expectation !== undefined

  if (init?.mediation !== 'conditional')
    expectation?.abort()

  const response = await request(id, init)

  if (response instanceof Error) {
    // aborting a conditional request is a normal flow
    if (response.name !== 'AbortError') console.error('Credential request failed', response)

    if (mounted)
      mount()

    return response
  }

  const echo = await passkeys.post(response)

  if (echo instanceof Error) {
    console.error('Credential verification failed', echo)

    if (mounted)
      mount()

    return echo
  }

  iam(echo)
  method.set('passkey')
}
