import type { Contact } from '@/contacts/svc'
import type { Notification } from '@/notifications'
import type { SvelteSet } from 'svelte/reactivity'

export interface Props {
  contacts: Contact[]
  title?: string
  actionable?: boolean
  selection?: SvelteSet<string>
  notifications?: Notification[]
}
