import type { Contact } from '@/contacts/svc'
import type { SvelteSet } from 'svelte/reactivity'

export interface Props {
  contacts: Contact[]
  title?: string
  actionable?: boolean
  selection?: SvelteSet<string>
  search?: string
}
