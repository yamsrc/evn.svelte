import type { AccountLike } from './AccountLike'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  screen?: Snippet<[{ authentication: () => ReturnType<Snippet> }]>
  account?: AccountLike
}
