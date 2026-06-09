import { dev } from '$app/environment'
import { apple, inApp } from './mq'

let hash: URLSearchParams = new URLSearchParams()
let search: URLSearchParams = new URLSearchParams()

export function fragment(name: string): string | null {
  return hash.get(name)
}

export function query(name: string): string | null {
  return search.get(name)
}

export function strip(): void {
  hash = new URLSearchParams()

  if (typeof window !== 'undefined')
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search)
}

function debug() {
  if (hash.size > 0)
    console.debug('Hash', Object.fromEntries(hash.entries()))

  if (search.size > 0)
    console.debug('Search', Object.fromEntries(search.entries()))
}

if (typeof window !== 'undefined') (() => {
  hash = new URLSearchParams(window.location.hash.slice(1))
  search = new URLSearchParams(window.location.search.slice(1))

  if (dev)
    debug()
})()

export function inAppPopOut() {
  if (!inApp) return

  const url = window.location.href

  if (apple)
    window.location.href = `x-safari-${url}`
  else
    window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`
}
