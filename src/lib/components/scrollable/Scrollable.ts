import type { ClassValue } from 'svelte/elements'
import type { Attachment } from 'svelte/attachments'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  infinite?: Options['infinite']
  align?: Options['align']
  /** Extend scroll area to full viewport width, breaking out of parent padding */
  bleed?: boolean
  class?: ClassValue
  style?: string
  id?: string
  dir?: 'ltr' | 'rtl'
  scroll?: number
  onscroll?: (e: Event) => void
}

export function scrollable(options: Options, mounted: boolean): Attachment<HTMLElement> {
  if (options.infinite) return infinite(options)
  else return finite(options, mounted)
}

function finite(options: Options, mounted: boolean): Attachment<HTMLElement> {
  if (options.scroll < 0) return () => undefined

  return (root) => {
    const el = root.children[options.scroll] as HTMLElement

    root.scrollTo({
      left: target(root, el, options.align),
      behavior: mounted ? 'smooth' : 'instant',
    })
  }
}

/**
 * Positions an infinite scroller on the middle copy.
 * Recenters after scroll drift, preserving the illusion of endless content.
 */
function infinite(options: Options): Attachment<HTMLElement> {
  return (root) => {
    const length = root.children.length / INFINITY

    if (length === 0) return

    const anchor = root.children[HALF * length + options.scroll] as HTMLElement
    const width = offset(root, root.children[length] as HTMLElement)

    let chill = false

    function onscrollend() {
      if (chill) return

      const pos = Math.floor((root.scrollLeft / root.scrollWidth) * INFINITY)

      if (pos === HALF) return

      chill = true
      setTimeout(() => (chill = false), 1_000)
      setTimeout(() => (root.scrollLeft += (HALF - pos) * width), 100)
    }

    root.scrollLeft = target(root, anchor, options.align)

    root.addEventListener('scrollend', onscrollend)

    return () => {
      root.removeEventListener('scrollend', onscrollend)
    }
  }
}

// keep it odd
export const INFINITY = 11
const HALF = (INFINITY - 1) / 2

interface Options {
  infinite: boolean
  align: 'start' | 'center'
  scroll: number
}

function offset(root: HTMLElement, el: HTMLElement): number {
  return el.offsetLeft - root.offsetLeft
}

/**
 * Calculates scrollLeft for a child.
 * Start alignment ignores bleed gutter; center alignment uses the visible container midpoint.
 */
function target(root: HTMLElement, el: HTMLElement, align: Options['align']): number {
  const left = offset(root, el)

  if (align === 'start') return left - inset(root)

  return left - root.clientWidth / 2 + el.clientWidth / 2
}

/**
 * Returns start gutter created by scroll-padding or padding.
 * Bleed lists use it for visual spacing, not as scrollable content.
 */
function inset(root: HTMLElement): number {
  const style = getComputedStyle(root)

  return value(style.scrollPaddingInlineStart) ?? value(style.paddingInlineStart) ?? 0
}

function value(raw: string): number | undefined {
  const parsed = Number.parseFloat(raw)

  return Number.isFinite(parsed) ? parsed : undefined
}
