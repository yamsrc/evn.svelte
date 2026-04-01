import type { OnNavigate } from '@sveltejs/kit'

export function transit(fn: (() => void) | (() => Promise<void>) = () => undefined): Promise<void> {
  if (document.startViewTransition === undefined) return Promise.resolve(fn())
  else return new Promise((resolve) => document.startViewTransition(async () => resolve(await fn())))
}

export function navigate(nav: OnNavigate): Promise<void> | void {
  if (nav.type === 'popstate' && nav.event.hasUAVisualTransition) return

  return transit()
}

export function takeoff(id: string, name: string, classes?: string) {
  const el = document.getElementById(id)

  if (el === null) {
    console.warn('No element to depart from', id)

    return
  }

  el.style.viewTransitionName = name

  if (classes !== undefined)
    el.style.viewTransitionClass = classes
}
