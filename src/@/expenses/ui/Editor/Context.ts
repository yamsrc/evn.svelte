import type { Snippet } from 'svelte'

export function context(value?: Value): Context {
  return {
    value: value ? exact(value) : blank(),
  }
}

function exact(value: Value): Value {
  return {
    title: value.title,
    location: value.location,
    participants: value.participants,
    extras: value.extras,
  }
}

function blank(): Value {
  return {
    title: '',
    location: '',
    participants: {},
    extras: [],
  }
}

export interface Props {
  value?: Value
  children: Snippet
}

export interface Context {
  value: Value
}

export interface Value {
  title: string
  location: string
  participants: Record<string, Participant>
  extras: Extra[]
}

interface Participant {
  amount: number
  paid?: number
  comment?: string
}

interface Extra {
  amount: number
  comment?: string
}
