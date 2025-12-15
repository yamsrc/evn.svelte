import * as origin from './net'
import { method, iam } from './store'

export async function basic(username: string, password: string): Promise<void | Error> {
  const credentials = btoa(`${username}:${password}`)
  const echo = await origin.get('Basic ' + credentials)

  if (echo instanceof Error) return echo

  iam(echo)
  method.set('password')
}
