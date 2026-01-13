import { dev, version as ver } from '$app/environment'
import { PUBLIC_API_ORIGIN } from '$env/static/public'

export const defaultLocale = 'en-US'

// change this
export const meta = {
  title: 'evn',
  description: 'Split wiser',
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

export const sleep: [number, number] | undefined = (() => {
  const sleep = import.meta.env.VITE_DEV_SLEEP

  if (sleep === undefined || typeof window === 'undefined')
    return

  const hostname = new URL(origin).hostname

  if (hostname !== 'localhost' && !isLocalIP(hostname))
    return

  const match = sleep.match(/^(?<min>\d+)-(?<max>\d+)$/)

  if (match?.groups === undefined)
    throw new Error(`Invalid sleep value: ${sleep}`)

  const min = Number.parseInt(match.groups.min)
  const max = Number.parseInt(match.groups.max)

  return [min, max]
})()

function isLocalIP(hostname: string) {
  return hostname.startsWith('192.168') || hostname.startsWith('172.16') || hostname.startsWith('10.')
}

export const GOOGLE_CLIENT_ID = '105318496428-724qi60cql3vlpduf7h145s9962rjffl.apps.googleusercontent.com'
export const APPLE_CLIENT_ID = 'com.evnapp.id'

const MAJOR_VERSION = '1'

export const version = (() => {
  const date = new Date(Number.parseInt(ver))
  const year = date.getFullYear()
  const startOfYear = new Date(year, 0, 1).getTime()
  const startNextYear = new Date(year + 1, 0, 1).getTime()
  const fraction = (date.getTime() - startOfYear) / (startNextYear - startOfYear)

  return `${MAJOR_VERSION}.${(year + fraction).toFixed(4)}`
})()
