import { Antenna, Puzzle } from '@lucide/svelte'
import type { Section } from '$com/shell'
import type { Dictionary } from '$lib/intl/dev'

export const sections = (dict: Dictionary): Section[] => [
  {
    id: 'components',
    href: '/dev/components/',
    label: dict.nav.components,
    Icon: Puzzle,
  },
  {
    id: 'transmission',
    href: '/dev/transmission/',
    label: dict.nav.transmission,
    Icon: Antenna,
  },
]
