import { goto } from '$app/navigation'
import type { AfterNavigate } from '@sveltejs/kit'

const history: string[] = []

export function track(nav: AfterNavigate, state?: App.PageState) {
  if (nav.to === null) return history

  const url = path(nav.to.url)
  const delta = nav.delta ?? 1

  if (delta < 0)
    history.splice(delta)
  else if (state !== undefined && replaced(state))
    history[history.length - 1] = url
  else
    history.push(url)
}

/**
 * Find the closest match in the stack to the target from end
 *
 * @param target - The target URL
 * @returns The closest match index in the stack to the target from end or -1 if not found
 */
function closest(target: string): number {
  return history.toReversed().findIndex((url) => url === target)
}

function path(url: URL): string {
  return url.pathname + url.search + url.hash
}

export async function back(href: string) {
  const target = path(new URL(href, window.location.href))
  const index = closest(target)

  if (index > 0 && index <= 42) window.history.go(-index)
  else if (history.length > 0) window.history.back()
  else await goto(href)
}

export async function replace(href: string, state?: App.PageState) {
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
  return (state as any)[REPLACE] === true
}

const REPLACE = Symbol('replace')
