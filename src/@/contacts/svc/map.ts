import { awaited, having } from 'svas'
import { accounts } from '@/account'
import { account } from '@/iam'
import type { Contact } from './Contact'
import type * as net from './net'

export async function map(entry: net.Contact): Promise<Contact | Error> {
  const me = await having(account)
  const i = entry.identities
  const identity = me.id === i[0] ? i[1] : i[0]
  const they = await awaited(accounts.get(identity))

  if (they instanceof Error) {
    console.error('Failed to get contact account', identity)
    console.error(they)

    return they
  }

  return {
    ...entry,
    identity,
    account: they,
  }
}
