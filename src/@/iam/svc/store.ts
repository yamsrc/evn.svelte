import { value } from 'svas'
import { derived, writable } from 'svelte/store'
import type { Echo } from './net'
import type { IDP } from './oidc'

const account = value<Echo>({
  persist: 'auth:account',
})

const challenge = value<string>({
  persist: 'auth:challenge',
  bind: account,
})

const method = value<Method>({
  persist: 'auth:method',
})

const authenticated = derived([challenge, account],
  ([$challenge, $account]) => $challenge !== null && $account !== null)

const processing = writable(false)
const greeting = writable(false)

function iam(value: Echo) {
  if (account.extract()?.id !== value.id)
    account.set(null) // clear bound stores

  account.set(value)
}

type Account = Echo
type Method = 'passkey' | 'password' | IDP

export { account, challenge, method, authenticated, processing, greeting, iam }
export type { Account, Method }
