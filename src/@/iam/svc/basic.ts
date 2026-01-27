import * as net from './net'
import { method, iam } from './store'
import { sync } from './sync'
import type { Echo } from './net'

export async function verify(username: string, password: string): Promise<Echo | Error> {
  const credentials = btoa(`${username}:${password}`)
  const echo = await net.get('Basic ' + credentials)

  if (echo instanceof Error) return echo

  iam(echo)
  method.set('password')

  return echo
}

export async function create(identity: string, body: net.basic.Basic): Promise<void | Error> {
  return await net.basic.post(identity, body)
}

export async function capture(identity: string, body: net.basic.Basic): Promise<void | Error> {
  const created = await create(identity, body)

  if (created instanceof Error) return created

  void sync()
}
