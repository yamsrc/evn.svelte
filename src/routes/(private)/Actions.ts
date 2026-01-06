import { ScanLine, PencilLine, User, Users } from '@lucide/svelte'
import { goto } from '$app/navigation'
import { NEWID } from '$lib/tools'
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
}

export const actions = (dict: Dictionary): ActionGroup[] => ([
  {
    name: dict.actions.cheques.title,
    items: [
      {
        id: 'nav-actions-cheqes-scan-button',
        name: dict.actions.cheques.scan,
        icon: ScanLine,
        onSelect: () => {

        },
      },
      {
        id: 'nav-actions-cheqes-input-button',
        name: dict.actions.cheques.input,
        icon: PencilLine,
        onSelect: () => {
          goto(`/expenses/${NEWID}/`)
        },
      },
    ],
  },
  {
    name: dict.actions.contacts.title,
    items: [
      {
        id: 'nav-actions-contacts-new-button',
        name: dict.actions.contacts.contact,
        icon: User,
        onSelect: () => goto('/contacts/new/'),
      },
      {
        id: 'nav-actions-contacts-groups-button',
        name: dict.actions.contacts.group,
        icon: Users,
        onSelect: () => goto('/contacts/groups/'),
      },
    ],
  },
])
