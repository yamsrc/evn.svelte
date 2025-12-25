import { ScanLine, PencilLine, User, Users } from '@lucide/svelte'
import { goto } from '$app/navigation'
import type { Dictionary } from '$lib/intl'
import type { Icon } from '@lucide/svelte'

type ActionItem = {
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
        name: dict.actions.cheques.scan,
        icon: ScanLine,
        onSelect: () => {

        },
      },
      {
        name: dict.actions.cheques.input,
        icon: PencilLine,
        onSelect: () => {

        },
      },
    ],
  },
  {
    name: dict.actions.contacts.title,
    items: [
      {
        name: dict.actions.contacts.contact,
        icon: User,
        onSelect: () => {

        },
      },
      {
        name: dict.actions.contacts.group,
        icon: Users,
        onSelect: () => goto('/contacts/groups/'),
      },
    ],
  },
])
