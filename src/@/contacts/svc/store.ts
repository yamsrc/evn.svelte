import { collection } from 'svas'
import { account } from '@/iam'
import { get } from './get'
import type { Contact } from './net'

export const contacts = collection<Contact>({
  get,
  persist: 'contacts:contacts',
  bind: account,
  stale: true,
})
