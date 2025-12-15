import { account } from './store'

export function logout() {
  account.set(null)
}
