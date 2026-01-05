import { collection } from 'svas'
import { account } from '@/iam/svc/store'
import { get } from './get'
import type * as origin from './net'

export const passkeys = collection<Passkey>({
  get,
  persist: 'identity:passkeys',
  bind: account,
  stale: true,
})

export type Passkey = origin.Passkey
