import type { Maybe } from 'svas'
import type { Account } from '@/accounts'
import type * as net from './net'

export interface Contact extends net.Contact {
  identity: string
  account: Maybe<Account>
  managed: boolean
}
