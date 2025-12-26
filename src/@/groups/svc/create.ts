import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { internal } from './store'

export async function create(properties: net.Editable): Promise<net.Group | Error> {
  const me = await having(account)

  const group = await net.post(me.id, properties)

  if (group instanceof Error) return group

  sync(group, internal)

  return group
}
