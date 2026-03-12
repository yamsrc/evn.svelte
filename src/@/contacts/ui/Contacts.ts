import type { SvelteSet } from 'svelte/reactivity'
import type { Notification } from '@/notifications'
import type { Contact } from '@/contacts/svc'

export interface Props {
  contacts: Contact[]
  title?: string
  actionable?: boolean
  selection?: SvelteSet<string>
  notifications?: Notification[]
}
