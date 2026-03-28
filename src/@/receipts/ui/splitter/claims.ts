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

import { get } from 'svelte/store'
import * as receipts from '@/receipts'
import { store, ensure, type State } from './store'
import type { Unit } from './groups'

export function unitClaimedBy(state: State, identity: string, item: string, index: number): boolean {
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
  return state.identities.some((identity) => unitClaimedBy(state, identity, item, index))
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
      if (unitClaimedBy(state, identity, item.item, i))
        return true

    return false
  })
}

/**
 * Get the claiming identities for an item
 */
export function unitIdentities(state: State, item: string, index: number): string[] {
  return state.identities.filter((identity) => unitClaimedBy(state, identity, item, index))
}

let pending = false

const MAX_ITERATIONS = 5

/**
 * Claim the state for an identity
 */
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

  // receipts store got updated in the `receipts.claim()` call
  const updated = get(store)
  const drifted = drift(updated, identity)

  if (drifted)
    claim(updated, identity, iteration + 1)
  else
    pending = false
}

/**
 * Extract claims
 */
export function extract(state: State, identity: string): receipts.ClaimChangeset {
  const patch: receipts.ClaimChangeset = {}
  const transient = state.transient[identity]

  if (transient !== undefined)
    for (const [item, claims] of Object.entries(transient)) {
      patch[item] = []

      claims.forEach((claim, index) =>
        (patch[item][index] = claim.value))
    }

  return patch
}

interface ItemClaim {
  item: string
  units: number
}

/**
 * Get the claims for an identity
 */
export function itemsClaimedBy(state: State, identity: string): ItemClaim[] {
  const claims = extract(state, identity)
  const items: ItemClaim[] = []

  for (const [id, units] of Object.entries(claims)) {
    const claimed = units.filter((unit) => unit === true).length

    if (claimed > 0)
      items.push({
        item: id,
        units: claimed,
      })
  }

  return items
}

/**
 * Detect drift between transient and persistent state
 */
function drift(state: State, identity: string): boolean {
  for (const claims of Object.values(state.transient[identity]))
    for (const claim of claims)
      if (!claim.settled)
        return true

  return false
}
