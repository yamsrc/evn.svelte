import { filter as contactsFilter } from '@/contacts'
import { filter as groupsFilter } from '@/groups'
import type { Contact } from '@/contacts'
import type { Favorite } from '@/favorites'
import type { Group } from '@/groups'

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
