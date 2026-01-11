import { getContext as svelteGetContext, setContext as svelteSetContext, type Snippet } from 'svelte'
import { get } from 'svelte/store'
import { account } from '@/iam'

const CONTEXT = Symbol('editor')

export function setContext(ctx: Context): void {
  svelteSetContext(CONTEXT, ctx)
}

export function getContext(): Context {
  return svelteGetContext(CONTEXT)
}

export function createContext(value?: Value): Context {
  return {
    value: value === undefined ? blank() : exact(value),
  }
}

function exact(value: Value): Value {
  return {
    title: value.title,
    location: value.location,
    participants: structuredClone(value.participants),
    extras: structuredClone(value.extras),
  }
}

function blank(): Value {
  const participants: Record<string, Participant> = {}
  const me = get(account)

  if (me !== null)
    participants[me.id] = { amount: 0 }

  return {
    title: '',
    location: '',
    participants,
    extras: [{ amount: 0 }],
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
