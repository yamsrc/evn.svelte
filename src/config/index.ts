import { dev, version as ver } from '$app/environment'
import { PUBLIC_API_ORIGIN } from '$env/static/public'

// change this
export const meta = {
  title: 'Hello world',
  description: 'Freshly baked',
} as const

export const navigation = {
  /** Entry point for authenticated users. */
  entry: '/',
} as const

export const origin = (() => {
  if (!dev || typeof window === 'undefined')
    return PUBLIC_API_ORIGIN

  const location = new URL(PUBLIC_API_ORIGIN)

  // local development
  if (isLocalIP(window.location.hostname)) {
    location.protocol = window.location.protocol
    location.hostname = window.location.hostname
    location.port = window.location.protocol === 'https:' ? '18000' : '8000' // see Caddyfile

    return location.origin
  }

  return PUBLIC_API_ORIGIN
})()

function isLocalIP(hostname: string) {
  return hostname.startsWith('192.168') || hostname.startsWith('172.16') || hostname.startsWith('10.')
}

export const GOOGLE_CLIENT_ID = 'REPLACE_ME'
export const APPLE_CLIENT_ID = 'REPLACE_ME'

const MAJOR_VERSION = '1'

export const version = (() => {
  const date = new Date(+ver)
  const year = date.getFullYear()
  const startOfYear = new Date(year, 0, 1).getTime()
  const startNextYear = new Date(year + 1, 0, 1).getTime()
  const fraction = (date.getTime() - startOfYear) / (startNextYear - startOfYear)

  return `${MAJOR_VERSION}.${(year + fraction).toFixed(4)}`
})()
