import type { HTMLImgAttributes } from 'svelte/elements'
import type { Account } from '@/iam'

type AccountLike = Pick<Account, 'id' | 'name' | 'picture' | 'premium'>

export interface Props {
  account: AccountLike
  size?: number
  class?: HTMLImgAttributes['class']
  style?: string
}
