import { satisfies } from 'semver'
import { ios, shell, shellVersion } from '$lib/tools'
import { browser } from '$app/environment'

export const apple = shellVersion !== null && ios && satisfies(shellVersion, '>=1.6')

export const stripe = browser && !shell

export const purchase = apple || stripe
