import type { Attachment } from 'svelte/attachments'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  infinite?: Options['enabled']
  align?: Options['align']
  class?: string
  dir?: 'ltr' | 'rtl'
  scroll?: number
  onscroll?: (e: Event) => void
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
  align: 'start' | 'center'
  scroll: number
}
