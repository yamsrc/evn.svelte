import type { AccountLike } from '../AccountLike'
import type { oidc } from '@/iam'
import type { Snippet } from 'svelte'

export interface Props {
  idp: oidc.IDP
  children?: Snippet
  account?: AccountLike
}
