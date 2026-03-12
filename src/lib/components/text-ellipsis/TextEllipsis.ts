import type { HTMLAttributes } from 'svelte/elements'
import type { Snippet } from 'svelte'

export type Props = HTMLAttributes<HTMLSpanElement> & {
  children?: Snippet<[{ props: Record<string, unknown> }]>
  class?: string
}
