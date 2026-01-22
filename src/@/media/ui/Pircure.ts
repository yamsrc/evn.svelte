import { origin } from '$config'
import type { HTMLImgAttributes } from 'svelte/elements'

export interface Props {
  ref?: HTMLImageElement
  id: string
  path?: string
  width?: number
  height?: number
  variant?: string
  format?: 'jpeg' | 'png' | 'webp'
  alt?: string
  class?: string
  style?: string
  loading?: HTMLImgAttributes['loading']
}

export function url(image: Image): string {
  return `${origin}${image.path}${image.id}${image.variant === undefined ? '' : '.' + image.variant}.${image.format ?? 'webp'}`
}

interface Image {
  path: string
  id: string
  variant?: string
  format?: 'jpeg' | 'png' | 'webp'
}
