import type { ScrollableProps } from '$com/scrollable'
import type { Context } from './Context'
import type { Snippet } from 'svelte'

export interface Props extends Omit<ScrollableProps, 'scroll' | 'children'> {
  picked?: number
  onpick: Context['pick']
  children: Snippet
}
