import { goto } from '$app/navigation'
import { path, type History } from './navigation'
import type { AfterNavigate } from '@sveltejs/kit'

const history: string[] = []

const REPLACE = Symbol('replace')

function closest(target: string): number {
  return history.toReversed().findIndex((url) => url === target)
}

function canGoBack(): boolean {
  return history.length > 0
}

function track(nav: AfterNavigate, state?: App.PageState): void {
  if (nav.to === null) return

  const url = path(nav.to.url)
  const delta = nav.delta ?? 1

  if (delta < 0)
    history.splice(delta)
  else if (state !== undefined && replaced(state))
    history[history.length - 1] = url
  else
    history.push(url)
}

async function replace(href: string, state?: App.PageState): Promise<void> {
  const patched = patch(state)

  await goto(href, { replaceState: true, state: patched })
}

function patch(state?: App.PageState): App.PageState {
  return {
    ...state,
    [REPLACE]: true,
  } as unknown as App.PageState
}

function replaced(state: App.PageState): boolean {
  return (state as Record<symbol, unknown>)[REPLACE] === true
}

export default { closest, canGoBack, track, replace } satisfies History
