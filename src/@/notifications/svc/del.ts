import { ensure } from 'svas'
import { account } from '@/iam'
import { net } from './net'
import { notifications as store } from './store'

export async function del(id: string): Promise<void | Error> {
  const me = ensure(account)

  const previous = store.extract(id)

  // optimistic
  store.delete(id)

  const res = await net.del(me.id, id)

  if (res instanceof Error) {
    if (previous !== null) store.add(previous)

    return res
  }
}
