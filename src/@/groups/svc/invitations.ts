import { sync } from 'svas'
import { internal } from './store'
import * as net from './net'

export async function get(id: string): Promise<net.Group | Error> {
  return await net.invitations.get(id)
}

export async function accept(id: string): Promise<void | Error> {
  const group = await net.invitations.del(id)

  if (group instanceof Error)
    return group

  sync(internal, group)
}
