import { LayoutGrid, Ticket, Users } from '@lucide/svelte'
import type { Section } from '$com/shell'
import type { Dictionary } from '$lib/intl'

export const sections = (dict: Dictionary): Section[] => [
  {
    id: 'home',
    href: '/',
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
    id: 'expenses',
    href: '/expenses/',
    label: dict.nav.expenses,
    Icon: Ticket,
  },
] as const satisfies Section[]
