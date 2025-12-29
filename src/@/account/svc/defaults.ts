import { get } from 'svelte/store'
import { assets } from '$config'
import { locale } from '$lib/intl'
import { deterministic } from '$lib/tools'
import { update, type Account } from '@/account'

function defaults(account: Account) {
  const updates: { locale?: string; picture?: string } = {}

  if (!account.picture)
    updates.picture = assets[deterministic(account.id, assets.length)]

  if (!account.locale)
    updates.locale = get(locale)

  if (Object.keys(updates).length > 0)
    update(account.id, updates)
}

export { defaults }
