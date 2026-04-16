/**
 * <Selector> Select participants → ✓ Submit
 * │
 * ├─ flatten & deduplicate selections
 * ├─ store.set(identities)
 * └─ back('..')  ← navigate to parent
 *        │
 *        ▼
 *   <Add> onMount()
 *        ├─ get(store) → identities
 *        ├─ onadd(identities)  ← parent callback
 *        └─ store.set([])      ← clear
 *
 * Store = one-shot message bus between routes.
 */

export { default as Add } from './Add.svelte'
export { default as Button } from './Button.svelte'
export { default as Selector } from './Selector.svelte'
import type { Options } from './Selector'

export interface ParticipantsState {
  identities: string[]
  options?: Options
}

export type { Options as ParticipantsOptions } from './Selector'
