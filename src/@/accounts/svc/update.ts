import { ensure } from 'svas'
import * as iam from '@/iam'
import * as net from './net'

export async function update(id: string, properties: net.Editable): Promise<void | Error> {
  const res = await net.patch(id, properties)

  if (res instanceof Error)
    return res

  if (ensure(iam.account).id === id)
    iam.update(res)
}
