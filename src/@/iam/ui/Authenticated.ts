import type { AccountLike } from './AccountLike'
import type { oidc } from '@/iam'
import type { Method } from '@/iam'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  screen?: Snippet<[{ authentication: () => ReturnType<Snippet> }]>
  account?: AccountLike
  oidc?: Record<oidc.IDP, boolean>
  oncreate?: (account: AccountLike, method: Method) => void
}
