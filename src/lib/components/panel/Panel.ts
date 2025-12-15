import type { RouteId } from '$app/types'
import type { ButtonProps } from '$ui/button'
import type { Snippet } from 'svelte'

export type Props = {
  left: Snippet
  right?: Snippet
  icon?: Snippet
  collapsed?: boolean

  /** Height classname, required for the panel to be smoothly collapsible */
  h?: string
} & ButtonProps &
  ActionProps

type ActionProps =
  | { actions?: never; action?: never }
  | { actions: Action[]; action: Snippet<[string]> }

export type Action = {
  id: string
  class?: string
  href?: RouteId
  onclick?: (e: Event) => void
}
