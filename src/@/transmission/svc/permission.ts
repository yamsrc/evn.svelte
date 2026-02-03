/** Returns current Notification API permission ('granted' | 'denied' | 'default') or null if not available. */
export function getPermission(): NotificationPermission | null {
  if (typeof Notification === 'undefined') return null

  return Notification.permission
}
