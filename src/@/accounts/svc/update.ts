import * as net from './net'
import { accounts } from './store'

export async function update(id: string, properties: net.Editable): Promise<void | Error> {
  const res = await net.patch(id, properties)

  if (res instanceof Error)
    return res

  accounts.set(res.id, res)
}
