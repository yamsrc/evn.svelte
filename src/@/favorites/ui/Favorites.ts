import type { Favorite } from '@/favorites'

export interface Props {
  favorites: Favorite[]
  title?: string
  selection?: Set<string>
}
