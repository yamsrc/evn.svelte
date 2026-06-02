import type { Snippet } from 'svelte'
import type { oidc } from '@/iam'
import type { Method } from '@/iam'
import type { AccountLike } from './AccountLike'

export interface Props {
  children: Snippet
  screen?: Snippet<[{ authentication: () => ReturnType<Snippet> }]>
  account?: AccountLike
  oidc?: Record<oidc.IDP, boolean>
  oncreate?: (account: AccountLike, method: Method) => void
  onauthenticate?: (method: Method) => void
}
