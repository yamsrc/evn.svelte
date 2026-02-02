export function getPermission(): NotificationPermission | null {
  if (typeof Notification === 'undefined') return null

  return Notification.permission
}

export function denied(): boolean {
  return getPermission() === 'denied'
}
