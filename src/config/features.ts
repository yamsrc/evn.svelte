import { satisfies } from 'semver'
import { ios, shellVersion } from '$lib/tools'

export const purchase = shellVersion !== null &&
  ios && satisfies(shellVersion, '>=1.6')
