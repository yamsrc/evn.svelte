import { satisfies } from 'semver'
import { ios, shell, shellVersion } from '$lib/tools'

export const apple = shell && ios && shellVersion !== null && satisfies(shellVersion, '>=1.6')

export const stripe = !shell

export const purchase = apple || stripe
