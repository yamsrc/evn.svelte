import type { Grammar } from '$lib/intl'

export interface Wallpaper {
  method: 'pattern' | 'picture'
  pattern?: string
  picture?: string
  effect?: string | null
}

export interface Account {
  id: string
  name: string
  picture: string
  /** @deprecated read-only fallback; new writes go via `wallpaper` */
  background?: string
  wallpaper?: Wallpaper | null
  locale?: string
  grammar?: Grammar | null
  overlord?: string | null
  premium?: number
  processor?: 'appstore' | 'stripe' | 'googleplay' | 'free'
  _created: number
  _version: number
}
