import type { ContactWithAccount } from './Contact'

export interface Props {
  contacts: ContactWithAccount[]
  title?: string
  actionable?: boolean
  selection?: Set<string>
}
