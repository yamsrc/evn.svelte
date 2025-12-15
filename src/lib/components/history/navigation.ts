import { writable, get } from 'svelte/store'
import { goto } from '$app/navigation'
import type { AfterNavigate } from '@sveltejs/kit'

const history = writable<string[]>([])

export function track(nav: AfterNavigate) {
  history.update((stack) => {
    if (nav.to === null) return stack

    const url = nav.to.url.pathname + nav.to.url.search + nav.to.url.hash

    const delta = nav.delta ?? 1

    if (delta >= 0)
      stack.push(url)
    else
      stack.splice(delta)

    return stack
  })
}

export function back(href: string) {
  const stack = get(history)
  const previous = stack[stack.length - 2] // [..., prev, current]
  const back = previous === href

  if (back) window.history.back()
  else goto(href)
}
