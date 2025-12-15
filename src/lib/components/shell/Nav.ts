import type { Icon } from '@lucide/svelte'
import type { Snippet } from 'svelte'

export interface Props {
  sections: Section[]
}

export interface Section {
  href: string | string[]
  label: Snippet
  Icon: typeof Icon
}

export function match(path: string | string[], current: string): boolean {
  if (typeof path === 'string')
    return path === '/' ? current === '/' : current.startsWith(path)
  else
    return path.some((p) => match(p, current))
}

export function exact(paths: string | string[], current: string): boolean {
  if (typeof paths === 'string') return paths === current

  return paths.some((p) => p === current)
}

export function href(paths: string | string[]): string | null {
  if (typeof paths === 'string') return paths
  else return paths[0]
}
