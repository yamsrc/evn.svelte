import { writable } from 'svelte/store'

export interface Props {
  scrollable?: boolean
  class?: string
}

export const overriden = writable<string | null>(null)

export function override(id: string) {
  overriden.set(id)

  return () => {
    overriden.set(null)
  }
}

export const backgrounds = [
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
  },
  {
    id: 'worms',
    name: 'Worms',
    filename: 'worms-1.svg',
    width: 135,
    height: 135,
  },
  {
    id: 'science',
    name: 'Science',
    filename: 'science-1.svg',
    width: 95,
    height: 95,
  },
  {
    id: 'spaghetti',
    name: 'Spaghetti',
    filename: 'spaghetti-1.svg',
    width: 95,
    height: 95,
  },
  {
    id: 'bubbles',
    name: 'Bubbles',
    filename: 'bubbles-1.svg',
    width: 25,
    height: 74,
  },
  {
    id: 'cubic',
    name: 'Cubic',
    filename: 'cubic.svg',
    width: 435,
    height: 450,
  },
  {
    id: 'waves',
    name: 'Waves',
    filename: 'waves-1.svg',
    width: 26,
    height: 11,
  },
  {
    id: 'dots',
    name: 'Dots',
    filename: 'dots-1.svg',
    width: 8,
    height: 8,
  },
  {
    id: 'grid',
    name: 'Grid',
    filename: 'grid-1.svg',
    width: 36,
    height: 36,
  },
  {
    id: 'evnly',
    name: 'Evnly',
    filename: 'evnly-1.svg',
    width: 24,
    height: 24,
  },
] as const satisfies Background[]

interface Background {
  id: string
  name: string
  filename: string
  width: number
  height: number
}
