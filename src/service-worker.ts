/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />

import { build, files, version } from '$service-worker'
// @ts-expect-error: wtf
import { PUBLIC_API_ORIGIN } from '$env/static/public'
import type { Notification } from './@/transmission'

const app = globalThis.self as unknown as ServiceWorkerGlobalScope
const dev = import.meta.env.VITE_DISABLE_CACHING === 'true'

const EXCLUDE = [
  '/.well-known/',
  '/screenshots/',
  '/og/',
]

if (dev)
  EXCLUDE.push('/')

const EXTERNAL = [
  PUBLIC_API_ORIGIN + '/pictures/',
]

const CACHE = `cache-${version}`
const STORAGE = 'storage'

// do not cache files at the top level and ignored paths (and no subpaths)
const ASSETS = [...build, ...files]
  .filter((path) => !EXCLUDE.some((prefix) => path.startsWith(prefix)) && path.split('/').length !== 2)

app.addEventListener('install', (event) => {
  async function install() {
    const start = Date.now()
    const cache = await caches.open(CACHE)

    await cache.addAll(['/', ...ASSETS])

    console.info(`${ASSETS.length} assets cached`)
    console.info(`App version ${version} installed in ${Date.now() - start}ms`)

    if (dev)
      app.skipWaiting()
  }

  event.waitUntil(install())
})

app.addEventListener('activate', (event) => {
  async function activate() {
    for (const key of await caches.keys())
      if (key !== CACHE) await caches.delete(key)

    await app.clients.claim()

    console.info('App activated')
  }

  event.waitUntil(activate())
})

app.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING')
    void app.skipWaiting()
})

app.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  if (event.request.method === 'POST' && url.pathname === '/share/') {
    async function share() {
      const data = await event.request.formData()
      const file = data.get('file') as File | null

      if (file === null)
        return Response.redirect('/share/', 303)

      const cache = await caches.open('share')

      await cache.put('/share/file', new Response(file, {
        headers: { 'Content-Type': file.type, 'X-File-Name': file.name },
      }))

      return Response.redirect('/share/', 303)
    }

    event.respondWith(share())

    return
  }

  if (event.request.method !== 'GET') return

  if (EXTERNAL.some((prefix) => event.request.url.startsWith(prefix))) {
    async function respond() {
      const storage = await caches.open(STORAGE)
      const cached = await storage.match(event.request.url)

      if (cached)
        return cached

      const response = await fetch(event.request.url)

      if (response.ok)
        await storage.put(event.request.url, response.clone())

      return response
    }

    event.respondWith(respond())

    return
  }

  if (dev || url.origin !== app.location.origin) return

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
