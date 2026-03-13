import { PencilLine, Plus, User, Users } from '@lucide/svelte'
import { ok } from 'svas'
import { derived } from 'svelte/store'
import { goto } from '$app/navigation'
import { dict } from '$lib/intl'
import { adventures } from '@/adventures'
import type { Dictionary } from '$lib/intl'
import type { Adventure } from '@/adventures'
import type { Icon } from '@lucide/svelte'

type ActionItem = {
  id: string
  name: string
  icon: typeof Icon
  onSelect: () => void
}

type ActionGroup = {
  name: string
  items: ActionItem[]
  direction?: 'row' | 'col'
}

function addAdventureExpense(dict: Dictionary, adventure: Adventure): ActionItem {
  return {
    id: 'nav-actions-adventure-expense-button',
    name: adventure.title,
    icon: PencilLine,
    onSelect: () => goto(`/adventures/${adventure.id}/expenses/editor/`),
  }
}

function addExpense(dict: Dictionary): ActionItem {
  return {
    id: 'nav-actions-cheques-input-button',
    name: dict.actions.cheques.input,
    icon: PencilLine,
    onSelect: () => goto('/expenses/editor/'),
  }
}

function addContact(dict: Dictionary): ActionItem {
  return {
    id: 'nav-actions-contacts-new-button',
    name: dict.actions.contacts.contact,
    icon: User,
    onSelect: () => goto('/contacts/new/'),
  }
}

function addContactGroup(dict: Dictionary): ActionItem {
  return {
    id: 'nav-actions-contacts-groups-button',
    name: dict.actions.contacts.group,
    icon: Users,
    onSelect: () => goto('/contacts/groups/'),
  }
}

function addAdventure(dict: Dictionary): ActionItem {
  return {
    id: 'nav-actions-adventures-new-button',
    name: dict.actions.adventures.adventure,
    icon: Plus,
    onSelect: () => goto('/adventures/editor/'),
  }
}

function latest(adventures: Adventure[]): Adventure | undefined {
  const active = adventures.filter((a) => !a.archived)

  return active.length > 0 ? active.reduce((a, b) => (a._created > b._created ? a : b)) : undefined
}

export const actions = derived([dict, adventures], ([$dict, $adventures]) => {
  const adventure = latest(ok($adventures) ? $adventures : [])

  return [
    ...(adventure !== undefined
      ? [
          {
            name: 'adventure',
            direction: 'col' as const,
            items: [addAdventureExpense($dict, adventure)],
          },
        ]
      : []),
    {
      name: $dict.actions.cheques.title,
      direction: 'col' as const,
      items: [addContactGroup($dict)],
    },
    {
      name: $dict.actions.contacts.title,
      direction: 'row' as const,
      items: [addContact($dict), addExpense($dict), addAdventure($dict)],
    },
  ] satisfies ActionGroup[]
})
