# Web Push Notifications - Specification

## Overview

Implement web push notifications using the Push API and Service Workers. Notifications will be delivered through the backend `/transmission/` endpoint, enabling real-time updates when users are not actively using the application.

## Architecture

Following domain-driven design pattern, web push will be implemented as a new domain under `src/@/push/`:

```
src/@/push/
├── index.ts          # Domain entry point
├── svc/              # Services layer
│   ├── index.ts      # Services exports
│   ├── store.ts      # Subscription state management
│   ├── subscribe.ts  # Subscription management
│   ├── unsubscribe.ts # Unsubscription
│   └── net/          # Network layer
│       ├── index.ts  # Network exports
│       ├── interface.ts  # API interface for /transmission/
│       └── Subscription.ts  # Subscription model types
└── ui/               # UI layer (optional)
    ├── index.ts      # UI exports
    └── Permission.svelte  # Permission request component
```

## Backend API Integration

### Endpoint: `/transmission/`

**Subscribe** - Register push subscription:

- `POST /transmission/{accountId}`
- Query parameters: `channel=web`
- Body: `{ channel: 'web', endpoint: { endpoint: string, keys: { p256dh: string, auth: string } } }`
- Response: `{ id: string }` (subscription ID) or error
- Requires authentication token in `Authorization` header

**Unsubscribe** - Remove push subscription(s):

- `POST /transmission/{accountId}?unsubscribe`
- Body: `{ ids: string[] }` (array of subscription IDs to remove)
- Response: `number` (remaining subscription count) or error
- Requires authentication token in `Authorization` header
- Note: This is a query operation (not a separate endpoint)
- Note: `accountId` is the currently authenticated account ID (`me.id` from `@/iam`)

**Note**: There is no update endpoint. To update a subscription (e.g., change VAPID keys), unsubscribe the old one and create a new subscription.

## Implementation Plan

### Phase 1: Core Infrastructure

1. **Service Worker** (`static/sw.js`)

   - Register service worker in app initialization
   - Detect and recover from missing/unregistered service workers
   - Handle `push` events
   - Handle `notificationclick` events (navigate using `clients.openWindow()`)
   - Browser handles service worker updates automatically (no manual re-registration needed)
   - Same lifecycle for PWA and regular web (stricter UX expectations when installed)

2. **Network Layer** (`src/@/push/svc/net/`)

   - Define `Subscription`, `SubscribeInput`, `UnsubscribeInput` interfaces matching backend model
   - Create resource for `/transmission/` endpoint using `origin.resource`
   - Implement `subscribe`, `unsubscribe` functions
   - Handle query parameters for `channel=web` and `ids[]` arrays

3. **Service Layer** (`src/@/push/svc/`)
   - `subscribe.ts` - Check permission, request permission if needed, create subscription with VAPID key, register with backend
   - `unsubscribe.ts` - Remove subscription(s) from backend and browser immediately on logout
   - `store.ts` - Manage subscription IDs using `svas` collection
   - Handle subscription expiration reactively (detect 404/410 errors and create new subscription)
   - Multi-tab coordination: Use BroadcastChannel to coordinate subscriptions across tabs (only one tab subscribes, others reuse)
   - Offline handling: Queue subscription attempts when offline, retry when connectivity returns
   - If local subscription succeeds but backend registration fails, persist locally and retry backend registration until success

### Phase 2: Integration

4. **Realtime Integration**

   - Push notifications are for notifications only (user alerts)
   - Realtime `/presence/` stream is for application data synchronization
   - No deduplication needed between push and realtime (different purposes)

5. **Authentication Integration**
   - Subscribe when user authenticates (`@/iam`)
   - Unsubscribe immediately when user logs out (only one account can be authenticated at a time)
   - Handle subscription per authenticated account (`me.id` from `@/iam`)

### Phase 3: UI & UX

6. **Permission Request** (`src/@/push/ui/`)

   - Component to request notification permission
   - Show permission status
   - Handle permission denial gracefully

7. **Settings Integration**
   - Add push notification toggle in account settings
   - Show subscription status
   - Allow manual subscribe/unsubscribe

### Phase 4: Testing

8. **E2E Tests** (`features/push.feature`)
   - Test permission request flow
   - Test subscription creation
   - Test notification delivery
   - Test notification click handling
   - Test unsubscription

## Technical Details

### Service Worker Registration

```typescript
// In app initialization (hooks.server.js or +layout.ts)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch((error) => {
    // Handle registration failure
    console.error('Service worker registration failed:', error)
  })

  // Detect and recover from missing/unregistered service workers
  navigator.serviceWorker.ready.then((registration) => {
    if (!registration.active) {
      // Re-register if worker is missing
      navigator.serviceWorker.register('/sw.js')
    }
  })
}
```

### Push Subscription Flow

1. Check browser support (`'serviceWorker' in navigator && 'PushManager' in window`)
2. Check notification permission (`Notification.permission`)
   - If `'denied'`, disable notifications and proactively delete backend subscription
   - If `'default'` or `'granted'`, proceed
3. Request notification permission if needed (`Notification.requestPermission()`)
4. Coordinate with other tabs using BroadcastChannel (only one tab should subscribe)
5. Get service worker registration
6. Subscribe to push service with VAPID public key:
   ```typescript
   const subscription = await registration.pushManager.subscribe({
     userVisibleOnly: true,
     applicationServerKey: VAPID_PUBLIC_KEY, // URL-safe base64 string
   })
   ```
7. Extract subscription data:
   ```typescript
   const endpoint = subscription.endpoint
   const key = subscription.getKey('p256dh')
   const auth = subscription.getKey('auth')
   ```
8. Send subscription to backend:
   ```typescript
   POST /transmission/{accountId}?channel=web
   Body: {
     channel: 'web',
     endpoint: {
       endpoint: subscription.endpoint,
       keys: {
         p256dh: arrayBufferToBase64(key),
         auth: arrayBufferToBase64(auth)
       }
     }
   }
   ```
9. Store subscription ID in domain store

### Push Event Handling

Service worker receives push event:

1. Parse notification data from push payload (JSON string):
   ```typescript
   {
     id: string,
     title?: string,
     body?: string,
     action?: string, // URL to navigate to
     data?: Record<string, unknown>,
     delivery?: {
       key?: string, // Notification grouping key
       visibility?: 'alert' | 'data',
       priority?: 'low' | 'normal' | 'high' | 'time-sensitive',
       ttl?: number
     }
   }
   ```
2. Show notification using `registration.showNotification()`:
   ```typescript
   await registration.showNotification(data.title || 'Notification', {
     body: data.body,
     data: {
       ...data.data,
       action: data.action, // Store navigation target in notification.data
     },
     tag: data.delivery?.key, // For grouping (same key replaces previous notification)
     requireInteraction: data.delivery?.visibility === 'alert',
     silent: data.delivery?.visibility === 'data', // Silent for background updates
     badge: '/icon-192.png',
     icon: '/icon-192.png',
     actions: data.action ? [{ action: 'open', title: 'Open' }] : [],
   })
   ```
3. Handle notification click in `notificationclick` event:
   - Extract `action` URL from `event.notification.data.action`
   - Use `clients.openWindow(action)` to navigate (or focus existing client)
   - Relative URLs are handled by SvelteKit routing
   - Absolute external URLs open normally in new tab/window
   - If app is closed, open URL immediately (don't defer to next launch)
4. Ignore malformed payloads silently (don't show notifications for invalid data)

### Subscription State Management

- Store subscription ID(s) in `svas` collection
- Use reactive error handling: Backend automatically removes expired/invalid subscriptions (404/410 responses)
- When 404/410 error detected, create new subscription automatically
- Multi-tab coordination: Use BroadcastChannel to coordinate subscriptions across tabs
- Only one subscription per browser instance (shared across tabs via BroadcastChannel)
- Maximum 64 subscriptions per account (backend enforced)
- Check `Notification.permission` on app start and before subscribing
- If permission is denied, disable notifications and proactively delete backend subscription

## Data Models

### Subscription (Network Model)

```typescript
export interface Subscription {
  id: string
  channel: 'web' | 'dev' | 'apns' | 'fcm'
  endpoint: WebPushEndpoint | string // For web channel, it's WebPushEndpoint
}

export interface WebPushEndpoint {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}
```

### Subscription Request

```typescript
export interface SubscribeInput {
  channel: 'web'
  endpoint: {
    endpoint: string
    keys: {
      p256dh: string
      auth: string
    }
  }
}

export interface SubscribeResponse {
  id: string
}
```

### Unsubscribe Request

```typescript
export interface UnsubscribeInput {
  ids: string[]
}

export interface UnsubscribeResponse {
  // Returns number (remaining subscription count)
}
```

### Push Notification Payload

```typescript
export interface PushPayload {
  id: string
  title?: string
  body?: string
  action?: string // URL to navigate to
  data?: Record<string, unknown>
  delivery?: {
    key?: string // Notification grouping key
    visibility?: 'alert' | 'data'
    priority?: 'low' | 'normal' | 'high' | 'time-sensitive'
    ttl?: number
  }
}
```

## Error Handling

- **Permission denial**: Check `Notification.permission` on app start and before subscribing. If denied, disable notifications and proactively delete backend subscription.
- **Subscription failures**: Retry backend registration if local subscription succeeds but backend registration fails. Persist local subscription and retry until success.
- **Service worker registration failures**: Detect and recover from missing/unregistered service workers. Re-register if worker is missing.
- **Network errors**: Queue subscription attempts when offline, retry when connectivity returns.
- **Expired subscriptions**: Reactively handle 404/410 errors by creating new subscription.
- **Malformed payloads**: Ignore silently (don't show notifications for invalid data).
- Log errors for debugging

## Security Considerations

- Validate VAPID keys (backend responsibility)
- Use HTTPS (required for push API)
- Secure subscription keys storage
- Validate push payloads

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Limited support (requires macOS/iOS 16.4+)
- Graceful degradation for unsupported browsers

## Integration Points

- **Authentication**: Subscribe on login, unsubscribe immediately on logout (only one account authenticated at a time)
- **Realtime**: Push notifications are for alerts only, realtime stream is for data sync (no coordination needed)
- **Accounts**: Store subscription per authenticated account (`me.id` from `@/iam`)
- **Settings**: Allow user to manage subscriptions
- **Multi-tab**: Use BroadcastChannel for coordination across tabs

## VAPID Public Key

The VAPID public key must be generated using the CLI in the backend project and added to `src/config/index.ts`.

### Generating VAPID Keys

VAPID keys can be generated using the CLI in the backend project:

```bash
cd ../evn.toa
npx cli vapid
```

This will generate both the private and public VAPID keys. The public key should be configured in the backend and made available to the frontend. The public key must be added to `src/config/index.ts` for use in the frontend.

### Obtaining the VAPID Public Key

The public key should be a URL-safe base64 string (not a Uint8Array).

### VAPID Key Rotation

VAPID key rotation is handled manually by developers in configuration/environment variables. When keys are rotated:

- Old subscriptions will fail (backend will return errors)
- New subscriptions will use the new key automatically
- Expired subscriptions are handled reactively (404/410 errors trigger new subscription creation)

## Notification Behavior

- **When app is active**: Push notifications are received but should NOT show browser notifications (push is for alerts, realtime handles data sync)
- **When app is backgrounded/closed**: Show browser notifications normally
- **Notification click**: Handle in service worker `notificationclick` event:
  - Extract `action` URL from `event.notification.data.action`
  - Use `clients.openWindow(action)` to navigate (or focus existing client)
  - Relative URLs are handled by SvelteKit routing
  - Absolute external URLs open normally in new tab/window
  - If app is closed, open URL immediately (don't defer to next launch)

## Communication Patterns

- **Service Worker ↔ Page**: Use `postMessage` via `navigator.serviceWorker.controller` for direct communication
- **Multi-tab coordination**: Use `BroadcastChannel` for fan-out to multiple tabs (subscription coordination)
- **Durable state**: Use IndexedDB for durable/shared state (not transient messages)
- **Notification navigation**: Store navigation target in `notification.data` and handle directly in service worker's `notificationclick` event

## Event Filtering

The backend supports per-event enable/disable via an `events` object. Event filtering configuration should be added to `src/config/index.ts` to control which events trigger push notifications.

Example configuration structure:

```typescript
export const pushEvents = {
  expenses: true,
  contacts: true,
  groups: true,
  favorites: true,
  // ... other event types
} as const
```

## Notification Grouping

- **Replace by default**: Notifications with the same `delivery.key` replace previous notifications (keeps notification center clean)
- **Tag mapping**: Always use `delivery.key` as the `tag` property in `showNotification()`
- **Silent data**: Use `visibility: 'data'` for background updates (silent notifications)
- **User-facing alerts**: Use `visibility: 'alert'` for user-facing notifications (require interaction)
- **Consistent behavior**: All platforms handle grouping consistently

## Notification Icons

- Use `/icon-192.png` for notification badge and icon (as defined in `static/manifest.json`)
- Icons are already configured in the manifest for PWA support
