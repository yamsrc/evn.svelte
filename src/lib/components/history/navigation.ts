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

export async function back(href: string) {
  const stack = get(history)
  const previous = stack[stack.length - 2] // [..., prev, current]
  const target = path(new URL(href, window.location.href))
  const back = previous === target

  if (back) window.history.back()
  else await goto(href)
}

function path(url: URL): string {
  return url.pathname + url.search + url.hash
}
