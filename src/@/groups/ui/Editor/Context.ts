import { getContext as svelteGetContext, setContext as svelteSetContext, type Snippet } from 'svelte'

const KEY = Symbol('groups.editor')

export function setContext(ctx: Context): void {
  svelteSetContext(KEY, ctx)
}

export function getContext(): Context {
  return svelteGetContext(KEY)
}

export function createContext(id?: string, value?: Partial<Value>): Context {
  const created = value === undefined ? blank() : exact(value)

  return {
    id,
    value: created,
    snapshot: JSON.stringify(created),
  }
}

function exact(partial: Partial<Value>): Value {
  return {
    name: partial.name ?? '',
    picture: partial.picture ?? '',
    reduction: partial.reduction ?? true,
    identities: partial.identities ?? [],
  }
}

function blank(): Value {
  return {
    name: '',
    picture: '',
    reduction: true,
    identities: [],
  }
}

export interface Props {
  id?: string
  value?: Partial<Value>
  children: Snippet
}

export interface Context {
  id?: string
  value: Value
  snapshot: string
}

export interface Value {
  name: string
  picture: string
  reduction: boolean
  identities: string[]
}
