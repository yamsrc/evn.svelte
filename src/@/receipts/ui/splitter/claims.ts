/*
We treat item claims as a small CRDT-like layer so the UI can update immediately
when a user toggles a claim, without waiting for the server round-trip.

`persistent` stores the last confirmed state received from the backend.
`transient` stores local optimistic changes that may still be in flight.

When fresh receipt data arrives, we merge it with local transient changes:
- if server state matches a local change, that transient change becomes settled
- if a transient change was already settled, it can be replaced by newer server data
- if a local change is still unresolved, we keep showing it in the UI

This allows claims to converge eventually while keeping the interface responsive
and avoiding hard blocking on network latency or concurrent updates.

Have fun.
*/

import { get, writable, type Writable } from 'svelte/store'
import * as receipts from '@/receipts'
import type { Unit } from './groups'

export const store: Writable<State> = writable({ id: '', version: 0, identities: [], items: {}, persistent: {}, transient: {} })

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

export function itemClaimedBy(state: State, identity: string, item: string, index: number): boolean {
  const transient = state.transient[identity]?.[item]?.[index]
  const persistent = state.persistent[identity]?.[item]?.[index]?.value

  return transient?.value ?? persistent === true
}

export function groupClaimedBy(state: State, identity: string, item: string): boolean {
  const quantity = state.items[item]?.quantity

  if (quantity === undefined)
    return false

  const transient = state.transient[identity]?.[item]
  const persistent = state.persistent[identity]?.[item]

  for (let i = 0; i < quantity; i++)
    if (transient?.[i] === undefined ? persistent?.[i].value !== true : transient[i].value !== true)
      return false

  return true
}

/**
 * Toggle a claim for an item
 */
export function toggle(identity: string, item: string, index: number): void {
  store.update((state) => {
    const transient = ensure(state.transient, identity, state.items[item])[index]
    const persistent = state.persistent[identity]?.[item]?.[index]?.value ?? false

    transient.value = transient.value === null ? !persistent : !transient.value
    transient.settled = false

    void claim(state, identity)

    return state
  })
}

/**
 * Toggle all claims for an item
 */
export function toggleAll(identity: string, item: string, on: boolean): void {
  store.update((state) => {
    const transient = ensure(state.transient, identity, state.items[item])

    for (const claim of transient) {
      if (claim.value === on)
        continue

      claim.value = on
      claim.settled = false
    }

    void claim(state, identity)

    return state
  })
}

/**
 * Check if a unit is claimed by anyone
 */
export function unitClaimed(state: State, item: string, index: number): boolean {
  return state.identities.some((identity) => itemClaimedBy(state, identity, item, index))
}

/**
 * Get the number of claimed units for an item
 */
export function claimedUnits(state: State, item: string): number {
  const quantity = state.items[item]?.quantity

  if (quantity === undefined)
    return 0

  let count = 0

  for (let index = 0; index < quantity; index++)
    if (unitClaimed(state, item, index))
      count++

  return count
}

/**
 * Get the claiming identities for an item
 */
export function itemIdentities(state: State, item: Unit): string[] {
  return state.identities.filter((identity) => {
    for (let i = 0; i < item.quantity; i++)
      if (itemClaimedBy(state, identity, item.item, i))
        return true

    return false
  })
}

/**
 * Get the claiming identities for an item
 */
export function unitIdentities(state: State, item: string, index: number): string[] {
  return state.identities.filter((identity) => itemClaimedBy(state, identity, item, index))
}

let pending = false

const MAX_ITERATIONS = 5

async function claim(state: State, identity: string, iteration = 0): Promise<void> {
  if (pending && iteration === 0)
    return

  if (iteration === MAX_ITERATIONS) {
    console.warn('Infinite loop protection', { state, identity })
    pending = false

    return
  }

  pending = true

  const result = await receipts.claim(state.id, {
    identity,
    claims: extract(state, identity),
  })

  if (result instanceof Error) {
    pending = false

    return
  }

  // receipts store got updated in the `receipts.claim` call
  const updated = get(store)
  const drifted = drift(updated, identity)

  if (drifted)
    claim(updated, identity, iteration + 1)
  else
    pending = false
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

/**
 * Detect drift between the local state and the server state
 */
function drift(state: State, identity: string): boolean {
  for (const claims of Object.values(state.transient[identity]))
    for (const claim of claims)
      if (!claim.settled)
        return true

  return false
}

export interface State {
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
