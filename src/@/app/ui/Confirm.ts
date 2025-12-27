import type { Snippet } from 'svelte'

export type Props = {
  title: string
  description: string
  confirm: Snippet
  open: boolean
  onconfirm: () => void
}
