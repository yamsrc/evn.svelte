/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />

import { build, version } from '$service-worker'

const app = globalThis.self as unknown as ServiceWorkerGlobalScope

const CACHE = `cache-${version}`
const ASSETS = [...build]

app.addEventListener('install', (event) => {
  async function install() {
    const cache = await caches.open(CACHE)

    await cache.addAll(ASSETS)

    console.log('Assets cached', ASSETS.length)
    console.log('App installed', version)
  }

  event.waitUntil(install())
})

app.addEventListener('activate', (event) => {
  async function deleteOldCaches() {
    for (const key of await caches.keys())
      if (key !== CACHE) await caches.delete(key)
  }

  event.waitUntil(deleteOldCaches())

  console.log('App activated', version)
})

app.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  async function respond() {
    const url = new URL(event.request.url)
    const cache = await caches.open(CACHE)

    if (ASSETS.includes(url.pathname)) {
      const response = await cache.match(url.pathname)

      if (response !== undefined)
        return response
    }

    try {
      const response = await fetch(event.request)

      if (!(response instanceof Response))
        throw new Error('invalid response from fetch')

      if (response.status === 200)
        cache.put(event.request, response.clone())

      return response
    } catch (err) {
      const response = await cache.match(event.request)

      if (response !== undefined)
        return response

      throw err
    }
  }

  event.respondWith(respond())
})

app.addEventListener('push', (event) => {
  async function notify() {
    let payload: {
      id?: string
      title?: string
      body?: string
      action?: string
      data?: Record<string, unknown>
      delivery?: {
        key?: string
        visibility?: 'alert' | 'data'
        priority?: 'low' | 'normal' | 'high' | 'time-sensitive'
        ttl?: number
      }
    } | null = null

    try {
      payload = event.data?.json() ?? null
    } catch {
      payload = null
    }

    const title = payload?.title ?? 'Notification'

    const options: NotificationOptions = {
      body: payload?.body,
      data: payload?.data ?? { action: payload?.action },
      tag: payload?.delivery?.key,
    }

    await app.registration.showNotification(title, options)
  }

  event.waitUntil(notify())
})

app.addEventListener('notificationclick', (event) => {
  const notification = event.notification
  const action = (notification?.data as { action?: string } | undefined)?.action

  notification.close()

  if (typeof action !== 'string' || action.length === 0) return

  event.waitUntil(
    app.clients.openWindow(action).catch(() => undefined),
  )
})
