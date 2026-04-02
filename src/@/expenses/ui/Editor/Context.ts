import { getContext as svelteGetContext, setContext as svelteSetContext, type Snippet } from 'svelte'
import { numbers } from '@/expenses'

const CONTEXT = Symbol('editor')

export function setContext(ctx: Context): void {
  svelteSetContext(CONTEXT, ctx)
}

export function getContext(): Context {
  return svelteGetContext(CONTEXT)
}

export function createContext(value?: Partial<Value>): Context {
  const created = value === undefined ? blank() : exact(value)

  return {
    value: created,
    mode: 'sums',
    snapshot: JSON.stringify(created),
  }
}

function exact(partial: Partial<Value>): Value {
  const value = blank(partial)
  const participants = structuredClone(value.participants)
  const shares = numbers.shares(value)

  for (const id of Object.keys(participants))
    participants[id].shares = shares[id]

  return {
    title: value.title,
    location: value.location,
    participants,
    extras: structuredClone(value.extras),
    attachments: structuredClone(value.attachments),
  }
}

function blank(draft?: Partial<Value>): Value {
  return {
    title: draft?.title ?? '',
    location: draft?.location,
    participants: draft?.participants ?? {},
    extras: draft?.extras ?? [],
    attachments: draft?.attachments ?? [],
  }
}

export interface Props {
  value?: Partial<Value>
  children: Snippet
}

export interface Context {
  value: Value
  mode: 'sums' | 'shares'
  snapshot: string
}

export interface Value {
  title: string
  location?: string
  participants: Record<string, Participant>
  extras: Extra[]
  attachments: string[]
  /** Total is calculated from participants */
  calculated?: boolean
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
