import { having } from 'svas'
import { sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { internal } from './store'

export async function update(id: string, body: net.Editable): Promise<net.Group | Error> {
  const me = await having(account)

  const group = await net.patch(me.id, id, body)

  if (group instanceof Error) return group

  sync(internal, group)

  return group
}
