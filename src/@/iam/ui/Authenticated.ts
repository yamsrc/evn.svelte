import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  screen?: Snippet<[{ authentication: () => ReturnType<Snippet> }]>
}
