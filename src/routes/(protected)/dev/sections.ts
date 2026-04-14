import { House } from '@lucide/svelte'
import type { Dictionary } from '$lib/intl/dev'
import type { Section } from '$com/shell'

export const sections = (dict: Dictionary): Section[] => [
  {
    id: 'home',
    href: '/',
    label: dict.nav.app,
    Icon: House,
  },
]
