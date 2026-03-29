import { get, writable } from 'svelte/store'
import type * as receipts from '@/receipts'

export const store = writable<State>({ id: '', version: 0, identities: [], items: {}, persistent: {}, transient: {} })

export function sync(receipt: receipts.Receipt): void {
  const stored = get(store)

  if (stored.id !== receipt.id)
    store.set({
      id: receipt.id,
      version: receipt._version,
      identities: receipt.identities,
      items: toMap(receipt.items),
      persistent: toClaims(receipt.items),
      transient: {},
    })
  else if (stored.version < receipt._version)
    store.update((state) => {
      merge(state, receipt)

      return state
    })
}

function toClaims(items: Item[]): Record<string, Claims> {
  const claims: Record<string, Claims> = {}

  for (const item of items)
    item.claims.forEach((identties, index) => {
      for (const identity of identties)
        ensure(claims, identity, item)[index].value = true
    })

  return claims
}

function toMap(items: Item[]): Record<string, Item> {
  return Object.fromEntries(items.map((item) => [item.id, item]))
}

/**
 * Merge a receipt into the store
 */
function merge(state: State, receipt: receipts.Receipt): void {
  state.version = receipt._version
  state.identities = receipt.identities
  state.items = toMap(receipt.items)
  state.persistent = toClaims(receipt.items)

  for (const [identity, items] of Object.entries(state.transient))
    for (const [item, claims] of Object.entries(items))
      claims.forEach((claim, index) => {
        const persistent = state.persistent[identity]?.[item]?.[index]?.value ?? false

        if (claim.value === persistent)
          claim.settled = true
        else if (claim.settled)
          claim.value = persistent
      })
}

/**
 * Ensure a claim exists for an item
 */
export function ensure(
  claims: Record<string, Claims>,
  identity: string,
  item: Item,
): Claim[] {
  claims[identity] ??= {}
  claims[identity][item.id] ??= Array.from({ length: item.quantity }, () => ({ value: null, settled: true }))

  return claims[identity][item.id]
}

export type Item = receipts.Item

export interface State {
  id: string
  version: number
  identities: string[]
  items: Record<string, Item>

  /** Claims per identity */
  persistent: Record<string, Claims>
  transient: Record<string, Claims>
}

export interface Claims {
  /** Claimed units per item id */
  [key: string]: Claim[]
}

interface Claim {
  value: boolean | null
  settled: boolean
}
