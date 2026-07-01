import { available } from './transport'
import { transmission } from './transmission'
import { purchases } from './purchases'

/** Facade over the native shell bridge: capability check plus feature namespaces. */
export const shell = {
  available,
  purchases,
  transmission,
}
