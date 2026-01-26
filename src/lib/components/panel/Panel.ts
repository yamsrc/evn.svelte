import type { ButtonProps } from '$ui/button'
import type { Snippet } from 'svelte'

export type Props = {
  highlighted?: boolean
  left: Snippet
  right?: Snippet
  bottom?: Snippet
  icon?: Snippet
  collapsed?: boolean
  selected?: boolean

  /** Height classname, required for the panel to be smoothly collapsible */
  h?: string
} & ButtonProps
  & ActionProps

export type ActionProps =
  | { actions?: never; action?: never }
  | { actions: Action[]; action: Snippet<[string]> }

export type Action = {
  id: string
  class?: string
  href?: string
  onclick?: (e: Event) => void
}
