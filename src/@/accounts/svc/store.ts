import { ok, values, type Maybe } from 'svas'
import { derived } from 'svelte/store'
import { browser } from '$app/environment'
import { dict } from '$lib/intl'
import { account, update } from '@/iam'
import { events } from '@/realtime'
import { tombstones } from './deleted'
import { get } from './get'
import type { Account } from './Account'

const internal = values<Account>({
  get,
  persist: 'accounts',
  stale: true,
  bind: account,
})

export const accounts = Object.create(internal, {
  get: {
    value: (id: string, opts?: Parameters<typeof internal.get>[1]) =>
      derived([internal.get(id, opts), dict], ([$account, $dict]): Maybe<Account> => {
        if (ok($account) && tombstones.has($account.id))
          return { ...$account, name: $dict.account.deleted }

        return $account
      }),
  },
}) as typeof internal

if (browser)
  events.on('default.accounts.sync', (value) => {
    internal.set(value.id, value)

    const me = account.extract()

    if (me?.id === value.id && (me._version === undefined || (value._version !== undefined && value._version > me._version)))
      update(value)
  })
