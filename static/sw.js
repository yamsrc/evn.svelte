const CACHE_NAME = 'evn-v1'
const ICON_PATH = '/icon-192.png'

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([ICON_PATH])
    }),
  )

  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      )
    }),
  )

  return self.clients.claim()
})

// Push event - handle incoming push notifications
self.addEventListener('push', (event) => {
  if (!event.data)
    return

  let data

  try {
    data = event.data.json()
  } catch (error) {
    // Ignore malformed payloads silently
    return
  }

  // Validate payload structure
  if (!data || typeof data !== 'object' || !data.id)
    return

  // Check if app is active - if so, don't show notifications
  // Push is for alerts, realtime handles data sync when app is active
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If there are active clients, don't show notification
      // (realtime stream handles updates when app is active)
      const hasActiveClients = clientList.some((client) => client.focused || client.visibilityState === 'visible')

      if (hasActiveClients)
        return // App is active, don't show notification

      const title = data.title || 'Notification'
      const body = data.body
      const action = data.action
      const tag = data.delivery?.key
      const visibility = data.delivery?.visibility
      const requireInteraction = visibility === 'alert'
      const silent = visibility === 'data'

      const notificationOptions = {
        body,
        data: {
          ...data.data,
          action, // Store navigation target in notification.data
        },
        tag, // For grouping (same key replaces previous notification)
        requireInteraction,
        silent,
        badge: ICON_PATH,
        icon: ICON_PATH,
        actions: action ? [{ action: 'open', title: 'Open' }] : [],
      }

      return self.registration.showNotification(title, notificationOptions)
    }),
  )
})

// Notification click event - handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const action = event.notification.data?.action

  if (!action)
    return

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Convert relative path to absolute URL (required for iOS standalone apps)
      const url = new URL(action, self.location.origin)
      const targetPath = url.pathname

      // If there are existing clients, navigate them (preferred for iOS standalone apps)
      if (clientList.length > 0) {
        // Try to find a client that matches the target path
        for (const client of clientList) {
          const clientUrl = new URL(client.url)

          if (clientUrl.pathname === targetPath && 'focus' in client)
            return client.focus()
        }

        // For existing clients, use postMessage to navigate (works reliably for iOS standalone)
        const client = clientList[0]

        if ('focus' in client)
          client.focus()

        // Send navigation message to the app (handled in push/rc.ts)
        return client.postMessage({ type: 'navigate', url: url.href })
      }

      // If no clients exist, open a new window (use absolute URL)
      if (self.clients.openWindow)
        return self.clients.openWindow(url.href)
    }),
  )
})
