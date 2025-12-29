import { account, type Account } from './store'

export function update(tobe: Partial<Account>): void {
  account.update((asis) => {
    if (asis === null) return null
    else return { ...asis, ...tobe }
  })
}
