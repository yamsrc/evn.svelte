import { convert } from '$lib/tools'
import { VAPID_PUBLIC_KEY } from '$config/configuration'

/** Returns VAPID public key as BufferSource for push subscription, or Error if not configured. */
export function getVapidKey(): BufferSource | Error {
  if (VAPID_PUBLIC_KEY === '') return new Error('VAPID public key not configured')

  return convert.base64urlToUint8Array(VAPID_PUBLIC_KEY) as BufferSource
}
