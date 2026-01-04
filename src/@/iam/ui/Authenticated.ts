import type { Snippet } from 'svelte'

interface AccountLike {
  id: string
  name?: string
}

export interface Props {
  children: Snippet
  screen?: Snippet<[{ authentication: () => ReturnType<Snippet> }]>
  account?: AccountLike
}
