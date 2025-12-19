import { browser } from '$app/environment'
import { account } from '@/iam'
import { events } from '@/realtime'
import type { Account } from './net'

function sync(state: Partial<Account>): Account | null {
  const current = account.extract()

  account.update((value) => {
    if (value === null) return null
    else return { ...value, ...state }
  })

  return current
}

if (browser)
  events.on('default.accounts.sync', (value) => sync(value))

export { sync }
