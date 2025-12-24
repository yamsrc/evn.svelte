import type * as net from './net'

export interface Contact extends Omit<net.Contact, 'identities' | '_created' | '_version'> {
  identity: string
}
