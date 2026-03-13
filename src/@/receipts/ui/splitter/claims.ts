import { get, writable, type Writable } from 'svelte/store'
import * as receipts from '@/receipts'

export const store: Writable<State> = writable({ id: '', version: 0, identities: [], items: {}, persistent: {}, transient: {} })

export function sync(receipt: receipts.Receipt): void {
  const value = get(store)

  if (value.id !== receipt.id)
    store.set({
      id: receipt.id,
      version: receipt._version,
      identities: receipt.identities,
      items: toMap(receipt.items),
      persistent: toClaims(receipt.items),
      transient: {},
    })
  else if (value.version !== receipt._version)
    store.update((state) => {
      merge(state, receipt)

      return state
    })
}

export function claimed(state: State, identity: string, item: string, index: number): boolean {
  const transient = state.transient[identity]?.[item]?.[index]
  const persistent = state.persistent[identity]?.[item]?.[index]?.value

  return transient?.value ?? persistent === true
}

export function toggle(identity: string, item: string, index: number): void {
  store.update((state) => {
    const transient = ensure(state.transient, identity, state.items[item])[index]
    const persistent = state.persistent[identity]?.[item]?.[index]?.value ?? false

    transient.value = transient.value === null ? !persistent : !transient.value
    transient.settled = false

    void receipts.claim(state.id, {
      identity,
      claims: extract(state, identity),
    })

    return state
  })
}

function ensure(
  claims: Record<string, Claims>,
  identity: string,
  item: receipts.Item,
): Claim[] {
  claims[identity] ??= {}
  claims[identity][item.id] ??= Array.from({ length: item.quantity }, () => ({ value: null, settled: true }))

  return claims[identity][item.id]
}

function toClaims(items: receipts.Item[]): Record<string, Claims> {
  const claims: Record<string, Claims> = {}

  for (const item of items)
    item.claims.forEach((identties, index) => {
      for (const identity of identties)
        ensure(claims, identity, item)[index].value = true
    })

  return claims
}

function toMap(items: receipts.Item[]): Record<string, receipts.Item> {
  return Object.fromEntries(items.map((item) => [item.id, item]))
}

export function identities(state: State, identity: string, item: string, index: number): Identities {
  const identities = state.identities.filter((identity) => claimed(state, identity, item, index))

  const me = identities.find((i) => i === identity)

  if (me === undefined) return { hero: identities[0], crowd: identities.slice(1) }
  else return { hero: me, crowd: identities.filter((identity) => identity !== me) }
}

/**
 * Merge a receipt into the store
 * - update identities
 * - update items
 * - update persistent claims
 * - settle matching transient claims
 * - update those that are already settled
 */
function merge(state: State, receipt: receipts.Receipt): void {
  state.version = receipt._version
  state.identities = receipt.identities
  state.items = toMap(receipt.items)
  state.persistent = toClaims(receipt.items)

  for (const [identity, items] of Object.entries(state.transient))
    for (const [item, claims] of Object.entries(items))
      claims.forEach((claim, index) => {
        const persistent = state.persistent[identity]?.[item]?.[index]?.value

        if (claim.value === persistent)
          claim.settled = true
        else if (claim.settled)
          claim.value = persistent
      })
}

/**
 * Extract claims
 */
function extract(state: State, identity: string): receipts.ClaimChangeset {
  const patch: receipts.ClaimChangeset = {}
  const items = state.transient[identity]

  for (const [item, claims] of Object.entries(items)) {
    patch[item] = []

    claims.forEach((claim, index) =>
      (patch[item][index] = claim.value))
  }

  return patch
}

interface State {
  id: string
  version: number
  identities: string[]
  items: Record<string, receipts.Item>

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

interface Identities {
  hero: string
  crowd: string[]
}
