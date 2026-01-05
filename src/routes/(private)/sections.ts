import { LayoutGrid, Ticket, User, Users } from '@lucide/svelte'
import type { Section } from '$com/shell'
import type { Dictionary } from '$lib/intl'

export const sections = (dict: Dictionary): Section[] => [
  {
    id: 'home',
    href: ['/'],
    label: dict.nav.home,
    Icon: LayoutGrid,
  },
  {
    id: 'contacts',
    href: '/contacts/',
    label: dict.nav.contacts,
    Icon: Users,
  },
  {
    id: 'evns',
    href: '/evns/',
    label: dict.nav.evns,
    Icon: Ticket,
  },
  {
    id: 'me',
    href: '/me/',
    label: dict.nav.profile,
    Icon: User,
  },
] as const satisfies Section[]
