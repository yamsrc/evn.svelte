import { values } from 'svas'
import { account } from '@/iam/svc/store'
import { type Account } from './Account'
import { get } from './get'

export const accounts = values<Account>({
  get,
  persist: 'accounts',
  stale: true,
  bind: account,
})
