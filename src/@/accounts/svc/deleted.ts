import type { Account } from './Account'

export const tombstones = new Set<string>()

export function tombstone(id: string): Account {
  return { id, name: '', picture: '', _created: 0, _version: 0 }
}

export function deleted(account: { id: string }): boolean {
  return tombstones.has(account.id)
}
