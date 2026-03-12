import { get } from 'svelte/store'
import { ensure } from 'svas'
import { account } from '@/iam'
import { permissions } from './store'
import * as net from './net'
import type { Permissions } from './net/Transmission'

export async function configure(update: Permissions): Promise<void | Error> {
  const me = ensure(account)
  const prev = get(permissions)

  const result = await net.configure(me.id, { permissions: { ...prev, ...update } })

  if (result instanceof Error) {
    permissions.set(prev)

    return result
  }

  permissions.set(result.permissions)
}
