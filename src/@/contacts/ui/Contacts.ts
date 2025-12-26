import type { ContactWithAccount } from './Contact'
import type { SvelteSet } from 'svelte/reactivity'

export interface Props {
  contacts: ContactWithAccount[]
  title?: string
  actionable?: boolean
  selection?: SvelteSet<string>
  search?: string
}
