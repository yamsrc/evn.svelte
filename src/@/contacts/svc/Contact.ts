import type * as net from './net'
import type { Account } from '@/account'
import type { Maybe } from 'svas'

export interface Contact extends net.Contact {
  identity: string
  account: Maybe<Account>
}
