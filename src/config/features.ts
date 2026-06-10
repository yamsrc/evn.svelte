import { satisfies } from 'semver'
import { ios, android, shell, shellVersion } from '$lib/tools'

export const apple = shell && ios && shellVersion !== null && satisfies(shellVersion, '>=1.6')

// TWA referrer (android-app://com.evnapp) sets `shell`; no shellVersion gate.
export const google = shell && android

export const stripe = !shell

export const purchase = apple || stripe || google
