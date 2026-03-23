import { getContext as svelteGetContext, setContext as svelteSetContext, type Snippet } from 'svelte'

const KEY = Symbol('adventures.editor')

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
  const value = blank(partial)

  return {
    title: value.title,
    picture: value.picture,
    participants: value.participants,
  }
}

function blank(draft?: Partial<Value>): Value {
  return {
    title: draft?.title ?? '',
    picture: draft?.picture ?? '',
    participants: draft?.participants ?? [],
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
  title: string
  picture: string
  participants: string[]
}
