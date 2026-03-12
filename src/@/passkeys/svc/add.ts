import { passkeys } from './store'
import * as origin from './net'
import { create } from './create'

export async function add(identity: string, name: string): Promise<void | Error> {
  const out = await create(name, identity)

  if (out instanceof Error) return out

  const key = await origin.post(identity, out.key)

  if (key instanceof Error) return key

  passkeys.add(key)
}
