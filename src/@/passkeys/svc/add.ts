import { create } from './create'
import * as origin from './net'
import { passkeys } from './store'

export async function add(id: string, name: string): Promise<void | Error> {
  const out = await create(name, id)

  if (out instanceof Error) return out

  const key = await origin.post(id, out.key)

  if (key instanceof Error) return key

  passkeys.add(key)
}
