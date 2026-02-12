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

export function createContext(value?: Value, draft?: Partial<Value>): Context {
  return {
    value: value === undefined ? blank(draft) : exact(value),
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
    attachments: structuredClone(value.attachments),
  }
}

function blank(draft?: Partial<Value>): Value {
  const me = get(account)
  const participants: Record<string, Participant> = {}

  if (me !== null)
    participants[me.id] = { amount: 0, paid: 0, shares: 0 }

  if (draft?.participants !== undefined)
    for (const [id, p] of Object.entries(draft.participants))
      if (!(id in participants)) participants[id] = { ...p }

  return {
    title: draft?.title ?? '',
    location: draft?.location ?? '',
    participants,
    extras: draft?.extras ?? [],
    attachments: draft?.attachments ?? [],
  }
}

export interface Props {
  value?: Value
  draft?: Partial<Value>
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
  attachments: string[]
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
