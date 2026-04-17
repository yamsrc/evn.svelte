import { writable } from 'svelte/store'

export const updateAvailable = writable(false)

let waiting: ServiceWorker | null = null

function check(worker: ServiceWorker): void {
  if (worker.state !== 'installed' || navigator.serviceWorker.controller === null)
    return

  waiting = worker
  updateAvailable.set(true)
}

export function track(registration: ServiceWorkerRegistration): void {
  if (registration.waiting !== null)
    check(registration.waiting)

  registration.addEventListener('updatefound', () => {
    const installing = registration.installing

    if (installing === null)
      return

    installing.addEventListener('statechange', () => check(installing))
  })
}

export function apply(): void {
  if (waiting === null)
    return

  navigator.serviceWorker.addEventListener('controllerchange', () => location.reload(), { once: true })
  waiting.postMessage({ type: 'SKIP_WAITING' })
}
