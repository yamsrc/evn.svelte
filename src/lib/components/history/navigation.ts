import { writable, get } from 'svelte/store'
import { goto } from '$app/navigation'
import type { AfterNavigate } from '@sveltejs/kit'

const history = writable<string[]>([])

export function track(nav: AfterNavigate) {
  history.update((stack) => {
    if (nav.to === null) return stack

    const url = path(nav.to.url)

    const delta = nav.delta ?? 1

    if (delta >= 0)
      stack.push(url)
    else
      stack.splice(delta)

    return stack
  })
}

/**
 * Find the closest match in the stack to the target from end
 * @param target - The target URL
 * @returns The closest match index in the stack to the target from end or -1 if not found
 */
function closest(target: string): number {
  const stack = [...get(history)].reverse()

  return stack.findIndex((url) => url === target)
}

export async function back(href: string) {
  const target = path(new URL(href, window.location.href))
  const index = closest(target)

  if (index > 0 && index <= 42) window.history.go(-index)
  else await goto(href)
}

function path(url: URL): string {
  return url.pathname + url.search + url.hash
}
