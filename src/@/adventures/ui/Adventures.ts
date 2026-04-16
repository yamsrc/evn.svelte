import type { Of } from '@/notifications'
import type { Adventure } from '@/adventures'

export interface Props {
  adventures: Adventure[]
  notifications?: Of<'adventures'>[]
  class?: string
}
