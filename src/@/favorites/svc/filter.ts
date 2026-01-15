import { search } from '$lib/tools'
import type { Contact } from '@/contacts'
import type { Favorite } from '@/favorites'

export function filter(
  favorites: Favorite[],
  contacts: Contact[],
  query?: string,
): Favorite[] {
  return search(favorites, query, (favorite) => {
    const contact = contacts.find((c) => c.identity === favorite.favorite)

    return contact?.account?.name
  })
}
