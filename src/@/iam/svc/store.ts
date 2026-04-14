import { derived, writable } from 'svelte/store'
import { value } from 'svas'
import type { IDP } from './oidc'
import type { Echo } from './net'

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

const processing = writable(false)
const greeting = writable(false)

const authenticated = derived([challenge, account, processing],
  ([$challenge, $account, $processing]) => $challenge !== null && $account !== null && $processing === false)

function iam(value: Echo) {
  if (account.extract()?.id !== value.id)
    account.set(null) // clear bound stores

  account.set(value)
}

type Account = Echo
type Method = 'passkey' | 'password' | IDP

export { account, challenge, method, authenticated, processing, greeting, iam }
export type { Account, Method }
