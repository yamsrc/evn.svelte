export type Domain = 'accounts' | 'contacts' | 'groups' | 'expenses'

export type EventMap = {
  accounts: 'created'
  contacts: 'connected' | 'transferred' | 'unchained'
  groups: 'joined'
  expenses: 'created'
}

export type Event<D extends Domain> = EventMap[D]

export type Scope = {
  [D in Domain]: { domain: D; event?: Event<D>; key?: string }
}[Domain]

export type ScopeKey = {
  [D in Domain]:
  | `/${D}/`
  | `/${D}/${Event<D>}/`
  | `/${D}/${Event<D>}/${string}/`
}[Domain]

export function key({ domain, event, key }: Scope): ScopeKey {
  if (event === undefined) return `/${domain}/`

  if (key === undefined) return `/${domain}/${event}/` as ScopeKey

  return `/${domain}/${event}/${key}/` as ScopeKey
}
