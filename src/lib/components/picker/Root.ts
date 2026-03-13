import type { ScrollableProps } from '$com/scrollable'
import type { Snippet } from 'svelte'

export interface Props extends Omit<ScrollableProps, 'scroll' | 'children'> {
  picked: number
  scroll?: number
  onpick: (index: number) => void
  children: Snippet
}
