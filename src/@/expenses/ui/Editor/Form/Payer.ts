import type { Value } from './Form'
import type { Contact } from '@/contacts'

export interface Props {
  participant: Value['participants'][string]
  contact?: Contact
  ontoggle?: (identity: string, on: boolean) => void
}
