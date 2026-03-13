import { origin } from '$config'
import type { HTMLImgAttributes } from 'svelte/elements'

export interface Props {
  ref?: HTMLImageElement
  id: string
  path?: string
  width?: number
  height?: number
  variant?: string
  densities?: number[]
  format?: 'jpeg' | 'png' | 'webp'
  alt?: string
  class?: HTMLImgAttributes['class']
  style?: string
  loading?: HTMLImgAttributes['loading']
}

interface Image {
  path: string
  id: string
  variant?: string
  format?: 'jpeg' | 'png' | 'webp'
}

export function url(image: Image): string {
  return `${origin}${image.path}${image.id}${image.variant === undefined ? '' : '.' + image.variant}.${image.format ?? 'webp'}`
}

export function scale(variant: string, density: number): string {
  if (density === 1) return variant

  const i = variant.indexOf('x')

  if (i === -1) return variant

  const w = parseInt(variant)
  const h = parseInt(variant.slice(i + 1))

  if (isNaN(w) || isNaN(h)) return variant

  const suffix = variant.slice(i + 1 + String(h).length)

  return `${Math.round(w * density)}x${Math.round(h * density)}${suffix}`
}

export function sources(image: Image & { variant: string }, densities: number[] = [1, 2]): string {
  return densities
    .map((d) => `${url({ ...image, variant: scale(image.variant, d) })} ${d}x`)
    .join(', ')
}

export function bg(image: Image & { variant: string }, densities: number[] = [1, 2]): string {
  const entries = densities
    .map((d) => `url("${url({ ...image, variant: scale(image.variant, d) })}") ${d}x`)
    .join(', ')

  return `image-set(${entries})`
}
