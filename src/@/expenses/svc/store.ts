import { collection, ok, sync, type Maybe, values } from 'svas'
import { derived } from 'svelte/store'
import { accounts } from '@/accounts'
import { account } from '@/iam'
import { notifications } from '@/notifications'
import { events } from '@/realtime'
import { get } from './get'
import { sort } from './unseen'
import type * as net from './net'
import type { Account } from '@/accounts'

export interface Expense extends net.Expense {
  accounts: Record<string, Maybe<Account>>
}

export const internal = collection<net.Expense>({
  get,
  persist: 'expenses',
  bind: account,
  stale: true,
  values: values<net.Expense>(),
})

events.on('default.expenses.sync', (entry: net.Expense) => sync(internal, entry))

export const expenses = derived<[typeof internal, typeof notifications], Maybe<Expense[]>>([internal, notifications], ([$expenses, $notifications], set, update) => {
  if (!ok($expenses))
    return set($expenses)

  const values = $expenses
    .map((expense) => map(expense))
    .sort(sort(ok($notifications) ? $notifications : []))

  set(values)

  const unsubs = values.flatMap((expense) =>
    Object.keys(expense.accounts).map((identity) =>
      accounts.get(identity).subscribe((account) => update((values) => {
        if (!ok(values) || !ok(account))
          return values

        const i = values.findIndex((value) => value.id === expense.id)

        if (i < 0 || values[i] === undefined)
          return values

        values[i] = {
          ...values[i],
          accounts: { ...values[i].accounts, [identity]: account },
        }

        return values
      })),
    ),
  )

  return () => unsubs.forEach((unsub) => unsub())
})

function map(entry: net.Expense): Expense {
  const linked: Record<string, Maybe<Account>> = {}

  for (const identity of Object.keys(entry.participants))
    linked[identity] = accounts.extract(identity)

  return { ...entry, accounts: linked }
}
