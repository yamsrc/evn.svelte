import { ensure } from 'svas'
import * as accounts from '@/accounts'
import { account, type Account } from './store'
import { update } from './update'

export function set(properties: Partial<Account>): void {
  update(properties)

  const me = ensure(account)

  void accounts.update(me.id, properties)
}
