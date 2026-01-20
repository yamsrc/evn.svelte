import type { Icon } from '@lucide/svelte'

export interface Props {
  sections: Section[]
  position?: 'start' | 'center' | 'end'
  class?: string
}

export interface Section {
  id: string
  href: string
  label: string
  Icon: typeof Icon
}

export function match(path: string | string[], current: string): boolean {
  if (typeof path === 'string') return path === '/' ? current === '/' : current.startsWith(path)
  else return path.some((p) => match(p, current))
}

export function exact(paths: string | string[], current: string): boolean {
  if (typeof paths === 'string') return paths === current

  return paths.some((p) => p === current)
}

export function href(paths: string | string[]): string | null {
  if (typeof paths === 'string') return paths
  else return paths[0]
}

export function nested(href: string, current: string): boolean {
  if (href === '/') return false

  return match(href, current) && !exact(href, current)
}
