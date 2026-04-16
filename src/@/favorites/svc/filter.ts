import { filter as groupsFilter } from '@/groups'
import { filter as contactsFilter } from '@/contacts'
import type { Group } from '@/groups'
import type { Favorite } from '@/favorites'
import type { Contact } from '@/contacts'

export function filter(
  favorites: Favorite[],
  contacts: Contact[],
  groups: Group[],
  query?: string,
): Favorite[] {
  const contactsFiltered = contactsFilter(contacts, query)
  const groupsFiltered = groupsFilter(groups, query)

  return favorites.filter((favorite) => {
    return contactsFiltered.some(({ identity }) => identity === favorite.favorite) ||
      groupsFiltered.some(({ id }) => id === favorite.favorite)
  })
}
