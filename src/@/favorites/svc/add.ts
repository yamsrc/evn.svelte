import { ensure, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { favorites } from './store'

export async function add(favorite: string): Promise<net.Favorite | Error> {
  const me = ensure(account)
  const entity = await net.post(me.id, { favorite })

  if (entity instanceof Error) return entity

  sync(favorites, entity)

  return entity
}
