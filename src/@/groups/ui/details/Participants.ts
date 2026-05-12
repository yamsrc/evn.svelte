import type { Group } from '@/groups'
import type { Props as LeaderboardProps } from '@/contacts/ui/Leaderboard'
import type { Account } from '@/accounts'
import type { Dictionary } from '$lib/intl'

export interface Props {
  group: Group
  class?: string
}

export function toEntries(group: Group, account: Account, dict: Dictionary): LeaderboardProps['entries'] {
  return group.identities.map((id) => ({
    id,
    value: group.balances?.[id] ?? 0,
    name: id === account?.id ? dict.expenses.me : undefined,
    href: id === account?.id ? '/me/' : `/contacts/${id}/`,
  }))
}
