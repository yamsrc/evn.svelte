import { get } from 'svelte/store'
import { locale } from '$lib/intl'
import { pickpic, update, type Account } from '@/accounts'

export function defaults(account: Account) {
  const updates: { locale?: string; picture?: string } = {}

  if (!account.picture)
    updates.picture = pickpic(account.id)

  if (!account.locale)
    updates.locale = get(locale)

  if (Object.keys(updates).length > 0)
    update(account.id, updates)
}
