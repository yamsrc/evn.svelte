import { ensure } from 'svas'
import * as iam from '@/iam'
import * as net from './net'

export async function update(id: string, properties: net.Editable, managed?: boolean): Promise<void | Error> {
  const me = ensure(iam.account)
  const res = managed ? await net.managed.patch(me.id, id, properties) : await net.patch(id, properties)

  if (res instanceof Error)
    return res

  if (me.id === id)
    iam.update(res)
}
