import type { HTMLAttributes } from 'svelte/elements'
import type { Snippet } from 'svelte'

export type Props = HTMLAttributes<HTMLSpanElement> & {
  children?: Snippet<[{ props: Record<string, unknown> }]>
  class?: string
}

export function ellipsis() {
  return 'inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap'
}
