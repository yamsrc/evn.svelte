import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export type Props = HTMLAttributes<HTMLSpanElement> & {
  children?: Snippet<[{ props: Record<string, unknown> }]>
  class?: string
}
