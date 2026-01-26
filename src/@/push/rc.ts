import { browser } from '$app/environment'
import { goto } from '$app/navigation'
import { account } from '@/iam'
import { subscribe, unsubscribe } from './svc'

const SW_PATH = '/sw.js'

function registerServiceWorker(): void {
  if (!browser || !('serviceWorker' in navigator))
    return

  navigator.serviceWorker
    .register(SW_PATH)
    .catch((error) => {
      console.error('Service worker registration failed:', error)
    })

  // Detect and recover from missing/unregistered service workers
  navigator.serviceWorker.ready.then((registration) => {
    if (registration.active === null)
      // Re-register if worker is missing
      navigator.serviceWorker.register(SW_PATH).catch((error) => {
        console.error('Service worker re-registration failed:', error)
      })
  })

  // Listen for messages from service worker (e.g., navigation requests)

  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data?.type === 'navigate' && typeof event.data.url === 'string') {
      const url = new URL(event.data.url, window.location.origin)

      // Navigate using SvelteKit's goto (handles relative paths correctly)
      void goto(url.pathname + url.search + url.hash)
    }
  })
}

function checkPermissionAndSubscribe(): void {
  if (!browser)
    return

  const me = account.extract()

  if (me === null) {
    // Not authenticated, unsubscribe
    void unsubscribe()

    return
  }

  // Check notification permission on app start
  if ('Notification' in window) {
    const permission = Notification.permission

    if (permission === 'denied') {
      // Permission denied, unsubscribe
      void unsubscribe()

      return
    }
  }

  // Subscribe if authenticated and permission is granted/default
  void subscribe()
}

function rc() {
  if (!browser)
    return

  // Register service worker
  registerServiceWorker()

  // Subscribe/unsubscribe when account changes
  account.subscribe(() => {
    checkPermissionAndSubscribe()
  })

  // Also check on initial load
  checkPermissionAndSubscribe()
}

export { rc }
