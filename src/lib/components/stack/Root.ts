import type { Snippet } from 'svelte'
import type { ClassValue } from 'tailwind-variants'

export interface Props {
  children: Snippet
  expanded?: boolean
  min?: number
  class?: ClassValue
}

export type StackContext = {
  increment: () => void
  decrement: () => void
  get expanded(): boolean
  get stacked(): boolean
}

export const STACK_CTX = Symbol('stack')
