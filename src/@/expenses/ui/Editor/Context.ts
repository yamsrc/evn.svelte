import { getContext as svelteGetContext, setContext as svelteSetContext, type Snippet } from 'svelte'
import { get } from 'svelte/store'
import { numbers } from '@/expenses'
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
    mode: 'sums',
  }
}

function exact(value: Value): Value {
  const participants = structuredClone(value.participants)
  const shares = numbers.shares(value)

  for (const id of Object.keys(participants))
    participants[id].shares = shares[id]

  return {
    title: value.title,
    location: value.location,
    participants,
    extras: structuredClone(value.extras),
  }
}

function blank(): Value {
  const participants: Record<string, Participant> = {}
  const me = get(account)

  if (me !== null)
    participants[me.id] = { amount: 0, paid: 0, shares: 0 }

  return {
    title: '',
    location: '',
    participants,
    extras: [],
  }
}

export interface Props {
  value?: Value
  children: Snippet
}

export interface Context {
  value: Value
  mode: 'sums' | 'shares'
}

export interface Value {
  title: string
  location?: string
  participants: Record<string, Participant>
  extras: Extra[]
}

interface Participant {
  amount: number
  paid?: number
  comment?: string
  shares?: number
}

interface Extra {
  amount: number
  comment?: string
}
