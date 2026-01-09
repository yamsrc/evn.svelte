import type { Favorite } from '@/favorites'

export interface Props {
  favorite: Favorite
  selected?: boolean
  onselect?: (id: string, selected: boolean) => void
  class?: string
}
