import { LayoutGrid, PiggyBankIcon, Users } from '@lucide/svelte'
import type { Section } from '$com/shell'
import type { Dictionary } from '$lib/intl'
import type { Notification } from '@/notifications'

export const sections = (dict: Dictionary, notifications: Notification[]): Section[] => [
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
    unseen: notifications.some((n) => n.domain === 'groups'),
  },
  {
    id: 'expenses',
    href: '/expenses/',
    label: dict.nav.expenses,
    Icon: PiggyBankIcon,
  },
]
