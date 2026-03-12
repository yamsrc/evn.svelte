import { ensure } from 'svas'
import { track } from '@vercel/analytics'
import { account, update as updateMe } from '@/iam'
import { accounts } from './store'
import * as net from './net'

export async function update(identity: string, properties: net.Editable): Promise<void | Error> {
  const res = await net.patch(identity, properties)

  if (res instanceof Error)
    return res

  accounts.set(res.id, res)

  if (properties.background !== undefined)
    track('Background', { background: properties.background })

  if (properties.grammar !== undefined)
    track('Grammar', { grammar: properties.grammar })

  if (properties.locale !== undefined)
    track('Locale', { locale: properties.locale })

  if (identity === ensure(account).id)
    updateMe(res)
}
