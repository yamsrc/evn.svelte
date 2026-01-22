import { values } from 'svas'
import { browser } from '$app/environment'
import { account, update } from '@/iam'
import { events } from '@/realtime'
import { get } from './get'
import type { Account } from './Account'

export const accounts = values<Account>({
  get,
  persist: 'accounts',
  stale: true,
  bind: account,
})

if (browser)
  events.on('default.accounts.sync', (value) => {
    accounts.set(value.id, value)

    const me = account.extract()

    if (me?.id === value.id && (me._version === undefined || (value._version !== undefined && value._version > me._version)))
      update(value)
  })
