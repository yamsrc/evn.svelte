import { values, type Maybe } from 'svas'
import { derived } from 'svelte/store'
import { browser } from '$app/environment'
import { dict } from '$lib/intl'
import { account, update } from '@/iam'
import { events } from '@/realtime'
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
        if ($account instanceof Error && 'code' in $account && $account.code === 404)
          return { id, name: $dict.account.deleted, picture: '', deleted: true, _created: 0, _version: 0 }

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
