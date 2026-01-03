import { apple, inApp } from './mq'

const hash: URLSearchParams = new URLSearchParams()
const search: URLSearchParams = new URLSearchParams()

export function fragment(name: string): string | null {
  return hash.get(name)
}

export function query(name: string): string | null {
  return search.get(name)
}

// function debug() {
//   if (hash.size > 0)
//     console.debug('Hash', Object.fromEntries(hash.entries()))

//   if (search.size > 0)
//     console.debug('Search', Object.fromEntries(search.entries()))
// }

// if (typeof window !== 'undefined') (() => {
//   hash = new URLSearchParams(window.location.hash.slice(1))
//   search = new URLSearchParams(window.location.search.slice(1))

//   if (dev)
//     debug()

//   // window.history.replaceState({}, '', window.location.pathname)
// })()

export function inAppPopOut() {
  if (!inApp) return

  const url = window.location.href

  if (apple)
    window.location.href = `x-safari-${url}`
  else
    window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`
}
