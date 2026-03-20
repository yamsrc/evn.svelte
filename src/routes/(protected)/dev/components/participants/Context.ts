import { getContext as svelteGetContext, setContext as svelteSetContext, type Snippet } from 'svelte'

const CONTEXT = Symbol('editor')

export function setContext(ctx: Context): void {
  svelteSetContext(CONTEXT, ctx)
}

export function getContext(): Context {
  return svelteGetContext(CONTEXT)
}

export function createContext(value?: Partial<Value>): Context {
  return {
    value: {
      identities: value?.identities ?? [],
    },
  }
}

export interface Props {
  value?: Partial<Value>
  children: Snippet
}

export interface Context {
  value: Value
}

export interface Value {
  identities: string[]
}
