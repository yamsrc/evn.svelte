import type { Grammar } from '$lib/intl'

export interface Account {
  id: string
  name: string
  picture: string
  background?: string
  locale?: string
  grammar?: Grammar | null
  overlord?: string | null
  premium?: number
  _created: number
  _version: number
}
