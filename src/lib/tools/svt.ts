import type { OnNavigate } from '@sveltejs/kit'

export function transit(fn: () => void = () => undefined): Promise<void> {
  if (document.startViewTransition === undefined) return Promise.resolve(fn())
  else return new Promise((resolve) => document.startViewTransition(() => resolve(fn())))
}

export function navigate(nav: OnNavigate): Promise<void> | void {
  if (nav.type === 'popstate' && nav.event.hasUAVisualTransition) return

  return transit()
}
