import { browser } from '$app/environment'
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
