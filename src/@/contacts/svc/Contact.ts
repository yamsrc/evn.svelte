import type * as net from './net'
import type { Account } from '@/account'

export interface Contact extends Omit<net.Contact, 'identities' | '_created' | '_version'> {
  account?: Account
}
