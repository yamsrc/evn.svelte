import type { Snippet } from 'svelte'
import type { ButtonProps } from '$ui/button'

export interface Props extends Omit<ButtonProps, 'onpointerdown' | 'onkeydown' | 'onclick'> {
  name?: string
  duration?: number
  label?: string
  position?: 'center' | 'left' | 'right' | 'top' | 'bottom'
  align?: 'center' | 'left' | 'right' | 'top' | 'bottom'
  /**
   * Teleport tooltip to `body`. Set `false` when trigger sits inside a
   * transformed ancestor (e.g. AlertDialog centered via `translate`) —
   * Safari's anchor positioning ignores ancestor transforms and misaligns
   * the tooltip. Keeping it in the transformed subtree fixes it.
   * Remove workaround once WebKit ships transform-aware anchors:
   * https://github.com/WebKit/standards-positions/issues/558
   * @default true
   */
  portal?: boolean
  onpress?: () => void
  onclick?: () => void
  message?: Snippet
}
