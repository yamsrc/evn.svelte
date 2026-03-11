import { LayoutGrid, Smile, Wallet } from '@lucide/svelte'
import type { Section } from '$com/shell'
import type { Dictionary } from '$lib/intl'
import type { Notification } from '@/notifications'

export const sections = (dict: Dictionary, notifications: Notification[]): Section[] => [
  {
    id: 'home',
    href: '/',
    nested: ['/me/'],
    label: dict.nav.home,
    Icon: LayoutGrid,
  },
  {
    id: 'contacts',
    href: '/contacts/',
    label: dict.nav.contacts,
    Icon: Smile,
    unseen: notifications.some(
      (n) =>
        n.domain === 'groups' ||
        (n.domain === 'contacts' && n.event === 'connected') ||
        (n.domain === 'contacts' && n.event === 'unchained'),
    ),
  },
  {
    id: 'expenses',
    href: '/expenses/',
    nested: ['/adventures/'],
    label: dict.nav.expenses,
    Icon: Wallet,
    unseen: notifications.some(
      (n) =>
        n.domain === 'expenses' ||
        (n.domain === 'contacts' && n.event === 'transferred'),
    ),
  },
]
