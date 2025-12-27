import type * as net from './net'
import type { Account } from '@/account'

export interface Contact extends net.Contact {
  identity: string
  account: Account
}
