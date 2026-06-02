import { having, sync } from 'svas'
import { account } from '@/iam'
import { track } from '@/ga'
import { internal } from './store'
import * as net from './net'

/**
 * Create a new group.
 */
export async function create(properties: net.Initial): Promise<net.Group | Error> {
  const me = await having(account)

  const group = await net.post(me.id, properties)

  if (group instanceof Error) return group

  sync(internal, group)
  track('groups.created')

  return group
}
