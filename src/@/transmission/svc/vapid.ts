import { VAPID_PUBLIC_KEY } from '$config'
import { convert } from '$lib/tools'

export function getVapidKey(): BufferSource | Error {
  if (VAPID_PUBLIC_KEY === '') return new Error('VAPID public key not configured')

  return convert.base64urlToUint8Array(VAPID_PUBLIC_KEY) as BufferSource
}
