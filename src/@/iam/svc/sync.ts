import * as origin from './net'
import { account, challenge } from './store'

/**
 * Sync account from origin
 */
export async function sync(): Promise<void | Error> {
  const credentials = challenge.extract()

  if (credentials === null) return

  const echo = await origin.get(credentials)

  if (echo instanceof Error) return echo

  account.set(echo)
}
