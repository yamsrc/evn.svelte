import type { ClassValue } from 'tailwind-variants'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  class?: ClassValue
  /**
   * Corner where menu aligns with trigger. Menu overlaps trigger with
   * corners matched at this point, growing outward from it.
   * @default 'end-bottom'
   */
  position?: 'start-top' | 'start-bottom' | 'end-top' | 'end-bottom'
}
