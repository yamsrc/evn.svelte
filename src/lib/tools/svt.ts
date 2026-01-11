import type { OnNavigate } from '@sveltejs/kit'

// Disable view transition for iOS swipe back/forward gesture
let hasUAVisualTransition = false

const onPopState = (e: PopStateEvent) => {
  hasUAVisualTransition = e.hasUAVisualTransition
}

export function mount() {
  window.addEventListener('popstate', onPopState)

  return () => window.removeEventListener('popstate', onPopState)
}

export function transit(fn: () => void = () => undefined): Promise<void> {
  if (document.startViewTransition === undefined || hasUAVisualTransition) return Promise.resolve(fn())
  else return new Promise((resolve) => document.startViewTransition(() => resolve(fn())))
}

export const navigate = (_: OnNavigate): Promise<void> => transit()
