import { track } from './svc/update'

export async function rc(): Promise<void> {
  if (!('serviceWorker' in navigator)) return

  const registration = await navigator.serviceWorker.ready

  track(registration)
}
