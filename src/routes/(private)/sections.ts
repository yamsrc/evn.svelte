import { LayoutGrid, Ticket, User, Users } from '@lucide/svelte'
import type { Section } from '$com/shell'
import type { Dictionary } from '$lib/intl'

export const sections = (dict: Dictionary): Section[] => [
  {
    href: ['/'],
    label: dict.nav.home,
    Icon: LayoutGrid,
  },
  {
    href: '/contacts/',
    label: dict.nav.contacts,
    Icon: Users,
  },
  {
    href: '/evns/',
    label: dict.nav.evns,
    Icon: Ticket,
  },
  {
    href: '/me/',
    label: dict.nav.profile,
    Icon: User,
  },
] as const satisfies Section[]
