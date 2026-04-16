import { ok, once } from 'svas'
import { track } from '@vercel/analytics'
import { notifications } from '@/notifications/svc/store'
import { account, processing } from '@/iam'
import { internal as groups } from '@/groups/svc/store'
import { favorites } from '@/favorites/svc/store'
import { internal as expenses } from '@/expenses/svc/store'
import { internal as internalContacts, contacts } from '@/contacts/svc/store'
import * as net from './net'

export async function demo(): Promise<void | Error> {
  track('demo')

  const demo = await net.demo.post()

  if (demo instanceof Error) return demo

  processing.set(true)
  account.set({ ...demo, roles: [] })

  await internalContacts.fetch()
  await expenses.fetch()
  await groups.fetch()
  await favorites.fetch()
  await notifications.fetch()

  await once(contacts, ($contacts) => ok($contacts) && $contacts.every((contact) => contact.account !== null))

  processing.set(false)
}
