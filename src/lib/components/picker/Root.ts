import type { Snippet } from 'svelte'
import type { Context } from './Context'
import type { ScrollableProps } from '$com/scrollable'

export interface Props extends Omit<ScrollableProps, 'scroll' | 'children'> {
  picked?: number
  onpick: Context['pick']
  children: Snippet
}
