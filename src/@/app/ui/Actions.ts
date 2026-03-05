import { PencilLine, User, Users } from '@lucide/svelte'
import { goto } from '$app/navigation'
import type { Dictionary } from '$lib/intl'
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

function addExpense(dict: Dictionary): ActionItem {
  return {
    id: 'nav-actions-cheqes-input-button',
    name: dict.actions.cheques.input,
    icon: PencilLine,
    onSelect: () => {
      goto('/expenses/editor/')
    },
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

export const actions = (dict: Dictionary): ActionGroup[] => ([
  {
    name: dict.actions.cheques.input,
    direction: 'col',
    items: [
      addContactGroup(dict),
    ],
  },
  {
    name: dict.actions.contacts.contact,
    direction: 'row',
    items: [
      addContact(dict),
      addExpense(dict),
    ],
  },
])
