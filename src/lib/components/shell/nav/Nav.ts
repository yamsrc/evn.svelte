import type { ClassValue } from 'svelte/elements'
import type { Icon } from '@lucide/svelte'

export interface Props {
  sections?: Section[]
  position?: 'start' | 'center' | 'end'
  underlay?: boolean
  class?: ClassValue
}

export interface Section {
  id: string
  href: string
  nested?: string[]
  label: string
  Icon: typeof Icon
  unseen?: boolean
}

export function match(section: Section, path: string): boolean {
  if (section.href === '/') // special case for home screen
    if (path === '/') return true
    else return section.nested?.some((nested) => path.startsWith(nested)) === true

  return path.startsWith(section.href) || section.nested?.some((nested) => path.startsWith(nested)) === true
}

export function exact(section: Section, path: string): boolean {
  if (section.href === '/') return path === '/'
  else return path === section.href
}

export function nested(section: Section, path: string): boolean {
  return match(section, path) && !exact(section, path)
}
