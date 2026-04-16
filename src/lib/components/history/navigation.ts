import { goto } from '$app/navigation'
import native from './native'
import manual from './manual'
import type { AfterNavigate } from '@sveltejs/kit'

export interface History {
  closest(target: string): number
  canGoBack(): boolean
  track(nav: AfterNavigate, state?: App.PageState): void
  replace(href: string, state?: App.PageState): Promise<void>
}

const impl = 'navigation' in globalThis ? native : manual

export function path(url: URL): string {
  return url.pathname + url.search + url.hash
}

export function track(nav: AfterNavigate, state?: App.PageState): void {
  impl.track(nav, state)
}

export async function back(href: string) {
  const target = path(new URL(href, window.location.href))
  const index = impl.closest(target)

  if (index > 0 && index <= 42) window.history.go(-index)
  else if (impl.canGoBack()) window.history.back()
  else await goto(href)
}

export async function replace(href: string, state?: App.PageState) {
  await impl.replace(href, state)
}
