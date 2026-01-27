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
    width: 500,
    height: 312,
  },
  {
    id: 'fragments',
    name: 'Fragments',
    width: 450,
    height: 450,
  },
  {
    id: 'cubic',
    name: 'Cubic',
    width: 435,
    height: 450,
  },
  {
    id: 'worms',
    name: 'Worms',
    width: 135,
    height: 135,
  },
  {
    id: 'science',
    name: 'Science',
    width: 190,
    height: 190,
  },
  // {
  //   id: 'evnly',
  //   name: 'Evnly',
  //   width: 24,
  //   height: 24,
  // },
] as const satisfies Background[]

interface Background {
  id: string
  name: string
  width: number
  height: number
}
