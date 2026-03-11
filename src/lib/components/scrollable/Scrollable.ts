import type { Snippet } from 'svelte'
import type { Attachment } from 'svelte/attachments'

export interface Props {
  children: Snippet
  infinite?: Options['enabled']
  align?: Options['align']
  class?: string
  dir?: 'ltr' | 'rtl'
  scroll?: number
  onscroll?: (e: Event) => void
}

export function scrollable(options: Options, mounted: boolean): Attachment {
  if (options.enabled) return infinity(options)

  return finite(options, mounted)
}

function finite(options: Options, mounted: boolean): Attachment {
  if (options.scroll < 0) return () => undefined

  return (root) => {
    const el = root.children[options.scroll] as HTMLElement | undefined

    if (el === undefined) return

    el.scrollIntoView({ behavior: mounted ? 'smooth' : 'instant', inline: options.align, block: 'nearest' })
  }
}

export function infinity(options: Options): Attachment {
  if (!options.enabled) return () => undefined

  return (root) => {
    const length = root.children.length / INFINITY

    if (length === 0) return

    const anchor = root.children[HALF * length + options.scroll] as HTMLElement
    const width = (root.children[length] as HTMLElement).offsetLeft

    let chill = false

    function onscrollend(e: Event) {
      if (chill) return

      const pos = Math.floor((root.scrollLeft / root.scrollWidth) * INFINITY)

      if (pos === HALF) return

      chill = true
      setTimeout(() => (chill = false), 1_000)
      setTimeout(() => (root.scrollLeft += (HALF - pos) * width), 100)
    }

    root.scrollLeft = options.align === 'start' ? anchor.offsetLeft : anchor.offsetLeft - root.clientWidth / 2 + anchor.clientWidth / 2
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
  enabled: boolean
  align: 'start' | 'center' | 'end'
  scroll: number
}
