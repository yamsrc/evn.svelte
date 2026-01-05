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

if (browser) {
  account.subscribe((value) => {
    if (value !== null)
      accounts.set(value.id, value)
  })

  events.on('default.accounts.sync', (value) => {
    const me = account.extract()

    if (me !== null && me.id === value.id && value._version !== undefined && value._version > me._version)
      update(value)
    else
      accounts.set(value.id, value)
  })
}
