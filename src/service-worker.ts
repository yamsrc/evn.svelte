/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />

import { build, files, version } from '$service-worker'

const app = globalThis.self as unknown as ServiceWorkerGlobalScope

const CACHE = `cache-${version}`
const ASSETS = [...build, ...files]

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

  const url = new URL(event.request.url)

  if (!ASSETS.includes(url.pathname)) return

  async function respond() {
    const cache = await caches.open(CACHE)
    const response = await cache.match(url.pathname)

    if (response) return response

    return fetch(event.request)
  }

  event.respondWith(respond())
})
