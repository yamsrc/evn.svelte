import type { Snippet } from 'svelte'
import type { ClassValue, HTMLAttributes } from 'svelte/elements'

export type Props = HTMLAttributes<HTMLSpanElement> & {
  children?: Snippet<[{ props: Record<string, unknown> }]>
  class?: ClassValue
}

export function textEllipsis() {
  return 'inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap'
}
