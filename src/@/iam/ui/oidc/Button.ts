import type { Snippet } from 'svelte'
import type { Method, oidc } from '@/iam'
import type { AccountLike } from '../AccountLike'

export interface Props {
  idp: oidc.IDP
  children?: Snippet
  account?: AccountLike
  onauthenticate?: (method: Method) => void
}
