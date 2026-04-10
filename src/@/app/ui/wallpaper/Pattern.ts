import { writable } from 'svelte/store'
import type { ClassValue } from 'svelte/elements'
import type { Wallpaper } from '@/accounts/svc/net/Account'

export interface Props {
  scrollable?: boolean
  class?: ClassValue
}

export const overriden = writable<Wallpaper | null>(null)

export function override(wallpaper: Wallpaper) {
  overriden.set(wallpaper)

  return () => {
    overriden.set(null)
  }
}

export const backgrounds: Background[] = [
  {
    id: 'pencil',
    name: 'Pencil',
    filename: 'pencil-1.svg',
    width: 500,
    height: 312,
  },
  {
    id: 'fragments',
    name: 'Fragments',
    filename: 'fragments-1.svg',
    width: 240,
    height: 248,
    opacity: 0.25,
  },
  {
    id: 'worms',
    name: 'Worms',
    filename: 'worms-1.svg',
    width: 135,
    height: 135,
    opacity: 0.15,
  },
  {
    id: 'science',
    name: 'Science',
    filename: 'science-1.svg',
    width: 95,
    height: 95,
    opacity: 0.15,
  },
  {
    id: 'spaghetti',
    name: 'Spaghetti',
    filename: 'spaghetti-1.svg',
    width: 135,
    height: 135,
    opacity: 0.15,
  },
  {
    id: 'bubbles',
    name: 'Bubbles',
    filename: 'bubbles-1.svg',
    width: 25,
    height: 74,
    opacity: 0.15,
  },
  {
    id: 'cubic',
    name: 'Cubic',
    filename: 'cubic-1.svg',
    width: 35,
    height: 49,
    opacity: 0.1,
  },
  {
    id: 'waves',
    name: 'Waves',
    filename: 'waves-1.svg',
    width: 26,
    height: 11,
    opacity: 0.1,
  },
  {
    id: 'dots',
    name: 'Dots',
    filename: 'dots-1.svg',
    width: 8,
    height: 8,
    opacity: 0.35,
  },
  {
    id: 'grid',
    name: 'Grid',
    filename: 'grid-1.svg',
    width: 36,
    height: 36,
    opacity: 0.075,
  },
  {
    id: 'evnly',
    name: 'Evnly',
    filename: 'evnly-1.svg',
    width: 24,
    height: 24,
    opacity: 0.05,
  },
]

interface Background {
  id: string
  name: string
  filename: string
  width: number
  height: number
  opacity?: number
}
