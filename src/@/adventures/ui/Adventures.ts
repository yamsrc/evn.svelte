import type { Adventure } from '@/adventures'
import type { Of } from '@/notifications'

export interface Props {
  adventures: Adventure[]
  notifications?: Of<'adventures'>[]
  class?: string
}
