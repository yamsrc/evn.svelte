/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />

import { build, files, version } from '$service-worker'

const app = globalThis.self as unknown as ServiceWorkerGlobalScope

const IGNORE = [
  '/screenshots/',
  '/og/',
  '.well-known/',
]

const CACHE = `cache-${version}`

// do not cache files at the top level and ignored paths (and no subpaths)
const ASSETS = [...build, ...files]
  .filter((path) => !IGNORE.some((filter) => path.startsWith(filter)) || path.split('/').length === 2)

app.addEventListener('install', (event) => {
  async function install() {
    const start = Date.now()
    const cache = await caches.open(CACHE)

    await Promise.all([
      cacheRoot(cache),
      cache.addAll(ASSETS),
    ])

    console.info(`${ASSETS.length} assets cached`)
    console.info(`App version ${version} installed in ${Date.now() - start}ms`)
  }

  event.waitUntil(install())
})

async function cacheRoot(cache: Cache): Promise<void> {
  const url = app.location.origin + '/'

  const response = await fetch(url)

  if (response.ok)
    await cache.put(url, response)
}

app.addEventListener('activate', (event) => {
  async function deleteOldCaches() {
    for (const key of await caches.keys())
      if (key !== CACHE) await caches.delete(key)
  }

  event.waitUntil(deleteOldCaches())

  console.info('App activated')
})

app.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)

  if (url.origin !== app.location.origin) return

  async function respond() {
    const cache = await caches.open(CACHE)
    const cached = await cache.match(url.pathname)

    if (cached)
      return cached

    const response = await fetch(event.request)

    if (response.ok)
      await cache.put(url.pathname, response.clone())

    return response
  }

  event.respondWith(respond())
})

app.addEventListener('push', (event) => {
  async function notify() {
    let payload: Notification | null = null

    try {
      payload = event.data?.json() ?? null
    } catch {
      payload = null
    }

    console.debug('Push event', payload)

    const title = payload?.title ?? 'Notification'

    const options: NotificationOptions = {
      body: payload?.body,
      data: payload?.data ?? { action: payload?.action },
      tag: payload?.delivery?.key,
    }

    if (payload?.delivery?.visibility !== 'data')
      await app.registration.showNotification(title, options)

    await navigator.setAppBadge(payload?.badge ?? 0)
  }

  event.waitUntil(notify())
})

app.addEventListener('notificationclick', (event) => {
  const notification = event.notification
  const action = (notification?.data as { action?: string } | undefined)?.action

  notification.close()

  if (typeof action !== 'string' || action.length === 0) return

  const url = new URL(action, app.location.origin)

  async function navigate() {
    const list = await app.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    })

    for (const client of list)

      if (new URL(client.url).origin === url.origin) {
        await client.focus()

        return client.navigate(url.href)
      }

    return app.clients.openWindow(url)
  }

  event.waitUntil(navigate())
})

export interface Notification {
  id: string
  title?: string
  badge?: number
  body?: string
  action?: string
  data?: Record<string, unknown>
  delivery?: Delivery
}

export interface Delivery {
  key?: string
  visibility?: 'alert' | 'data'
  priority?: 'low' | 'normal' | 'high' | 'time-sensitive'
  ttl?: number
}
