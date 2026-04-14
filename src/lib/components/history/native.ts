/// <reference types="@types/dom-navigation" />
import { goto } from '$app/navigation'
import { path, type History } from './navigation'

function closest(target: string): number {
  const entry = window.navigation.currentEntry

  if (entry === null) return -1

  const entries = window.navigation.entries()

  for (let i = entry.index - 1; i >= 0; i--) {
    const url = entries[i].url

    if (url !== null && path(new URL(url)) === target)
      return entry.index - i
  }

  return -1
}

function canGoBack(): boolean {
  return window.navigation.canGoBack
}

function track(): void { }

async function replace(href: string, state?: App.PageState): Promise<void> {
  await goto(href, { replaceState: true, state })
}

export default { closest, canGoBack, track, replace } satisfies History
