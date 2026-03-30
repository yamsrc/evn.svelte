import type { Snippet } from 'svelte'

export interface Props {
  contentW: number
  contentH: number
  viewBox?: string
  maxZoom?: number
  zoomStep?: number
  pad?: number
  class?: string
  children?: Snippet
}
