import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { internal } from './store'
import * as net from './net'

export async function rate(id: string, good: boolean): Promise<void | Error> {
  const me = ensure(account)

  const rated = await net.ratings.post(me.id, id, { good })

  if (rated instanceof Error) return rated

  sync(internal, rated)
}
