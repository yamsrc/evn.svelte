# Phase 1: Domain Foundation

[← Back to Plan](../2026-03-10-adventures-implementation.md)

Status: done
Verification: `npm run check` + `npm run lint` passed

---

### Task 1: Network Types

**Ref:** seed-svelte → patterns.md (Network Type Naming, Domain Creation Checklist)

**Files:**

- Create: `src/@/adventures/svc/net/Adventure.ts`
- Create: `src/@/adventures/svc/net/index.ts`

**Step 1: Create Adventure network type**

Verified against `evn.toa/application/components/adventures/types.ts` and exposition `io:output` in `manifest.toa.yaml`:

```typescript
export interface Expense {
  id: string
  title: string
  location?: string
  date: string
  amount: number
  payer: string
  attachments: string[]
}

export interface Adventure {
  id: string
  participants: Record<string, number>
  title: string
  picture: string
  expenses: Expense[]
  archived: boolean
  archivedAt: number | null
  archivator?: string
  _created: number
  _version: number
}

export interface Invitation {
  id: string
  title: string
  picture: string
  identities: string[]
}
```

`Adventure` here is CRUD wire payload. `identities` is not serialized by CRUD exposition, only by invitation `GET`.

**Step 2: Create net index** (stub — exports added as files are created in Tasks 2-3)

```typescript
export * from './Adventure'
```

---

### Task 2: Network Interface

**Ref:** seed-svelte → patterns.md (Service Operation Patterns)

**Files:**

- Create: `src/@/adventures/svc/net/interface.ts`
- Modify: `src/@/adventures/svc/net/index.ts` — add `export * from './interface'`

Verified against `evn.toa/application/components/adventures/manifest.toa.yaml` and operation files:

```typescript
import { origin } from '@/net'
import type { Contact } from '@/contacts/svc/net'
import type { Adventure, Expense, Invitation } from './Adventure'

const adventures = origin.resource<Adventure>('/adventures/', { credentials: 'include' })

export async function get(identity: string): Promise<Adventure[] | Error> {
  return adventures.json(identity)
}

export type Create = Pick<Adventure, 'title' | 'picture'> & { participants?: string[] }

export async function post(identity: string, body: Create): Promise<Adventure | Error> {
  return adventures.json(identity, { method: 'POST', body })
}

export type Assign = Partial<Pick<Adventure, 'title' | 'picture'>>

export async function patch(
  identity: string,
  id: string,
  body: Assign,
): Promise<Adventure | Error> {
  return adventures.json(`${identity}/${id}`, { method: 'PATCH', body })
}

export type ExpenseInput = Pick<Expense, 'title' | 'amount' | 'payer'> &
  Partial<Pick<Expense, 'location' | 'date' | 'attachments'>>

export interface Add {
  participants?: string[]
  expenses?: ExpenseInput[]
}

export async function add(identity: string, id: string, body: Add): Promise<Adventure | Error> {
  return adventures.json(`${identity}/${id}`, { method: 'POST', body })
}

export interface ArchiveInput {
  merge?: boolean
}

export async function put(
  identity: string,
  id: string,
  body: ArchiveInput,
): Promise<Adventure | Error> {
  return adventures.json(`${identity}/${id}`, { method: 'PUT', body })
}

export async function del(identity: string, id: string): Promise<void | Error> {
  return adventures.json(`${identity}/${id}`, { method: 'DELETE' })
}

export async function expose(identity: string, id: string): Promise<Contact[] | Error> {
  return adventures.json(`${identity}/${id}/contacts/`)
}

export const pictures = {
  resource: origin.resource<{ id: string }>('/adventures/pictures'),
  post: (body: File): Promise<{ id: string } | Error> => pictures.resource.json('', { method: 'POST', body }),
}

export const invitations = {
  resource: origin.resource<Invitation>('/adventures/invitations/'),
  get: (id: string): Promise<Invitation | Error> => invitations.resource.json(id),
  del: (id: string): Promise<Adventure | Error> =>
    invitations.resource.json<Adventure>(id, { method: 'DELETE', credentials: 'include' }),
}
```

---

### Task 3: Events & Store

**Ref:** seed-svelte → stores.md (collection, sync, events)

**Files:**

- Create: `src/@/adventures/svc/net/Events.ts`
- Modify: `src/@/adventures/svc/net/index.ts` — add `export * from './Events'`
- Create: `src/@/adventures/svc/store.ts`

**Step 1: Events**

```typescript
import type { Adventure } from './Adventure'

export type Events = {
  'default.adventures.sync': Adventure
  'default.adventures.quit': Adventure
}
```

**Step 2: Store**

```typescript
import { collection, sync, values } from 'svas'
import { account } from '@/iam'
import { events } from '@/realtime'
import { get } from './get'
import type * as net from './net'

export type { Adventure } from './net'

export const adventures = collection<net.Adventure>({
  get,
  persist: 'adventures',
  bind: account,
  stale: true,
  values: values<net.Adventure>(),
})

events.on('default.adventures.sync', (entry: net.Adventure) => sync(adventures, entry))
events.on('default.adventures.quit', (entry: net.Adventure) => adventures.delete(entry.id))
```

**Step 3: Get helper**

```typescript
import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function get(): Promise<net.Adventure[] | Error> {
  const me = await having(account)
  return net.get(me.id)
}
```

---

### Task 4: Service Operations

**Ref:** seed-svelte → patterns.md (Service Operation Patterns)

**Files:**

- Create: `src/@/adventures/svc/invitations.ts`
- Create: `src/@/adventures/svc/create.ts`
- Create: `src/@/adventures/svc/assign.ts`
- Create: `src/@/adventures/svc/add.ts`
- Create: `src/@/adventures/svc/expense.ts`
- Create: `src/@/adventures/svc/archive.ts`
- Create: `src/@/adventures/svc/leave.ts`
- Create: `src/@/adventures/svc/expose.ts`
- Create: `src/@/adventures/svc/pictures.ts`

**Step 1: create.ts**

```typescript
import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { adventures } from './store'

export async function create(input: net.Create): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.post(me.id, input)
  if (adventure instanceof Error) return adventure
  sync(adventures, adventure)
  return adventure
}
```

**Step 2: assign.ts**

```typescript
import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { adventures } from './store'

export async function assign(id: string, input: net.Assign): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.patch(me.id, id, input)
  if (adventure instanceof Error) return adventure
  sync(adventures, adventure)
  return adventure
}
```

**Step 3: expense.ts**

```typescript
import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { adventures } from './store'

export async function expense(
  id: string,
  input: net.ExpenseInput[],
): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.add(me.id, id, { expenses: input })
  if (adventure instanceof Error) return adventure
  sync(adventures, adventure)
  return adventure
}
```

**Step 4: archive.ts**

Backend: if `expenses.length === 0` → sets `_deleted` (soft delete). Toa framework emits `quit` event (not `sync`) for `_deleted` objects. Store's `quit` handler (`adventures.delete(id)`) cleans up automatically.

```typescript
import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { adventures } from './store'

export async function archive(id: string, merge?: boolean): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.put(me.id, id, { merge })
  if (adventure instanceof Error) return adventure
  sync(adventures, adventure)
  return adventure
}
```

**Step 5: leave.ts**

```typescript
import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { adventures } from './store'

export async function leave(id: string): Promise<void | Error> {
  const me = await having(account)
  const result = await net.del(me.id, id)
  if (result instanceof Error) return result
  adventures.delete(id)
}
```

**Step 6: add.ts** — add participants to existing adventure

```typescript
import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { adventures } from './store'

export async function add(id: string, participants: string[]): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.add(me.id, id, { participants })
  if (adventure instanceof Error) return adventure
  sync(adventures, adventure)
  return adventure
}
```

**Step 7: expose.ts**

```typescript
import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function expose(id: string) {
  const me = await having(account)
  return net.expose(me.id, id)
}
```

**Step 8: invitations.ts**

```typescript
import * as net from './net'

export async function get(id: string): Promise<net.Adventure | Error> {
  return net.invitations.get(id)
}

export async function accept(id: string): Promise<net.Adventure | Error> {
  return net.invitations.del(id)
}
```

**Step 9: pictures.ts** — preset cover IDs + upload

```typescript
import * as net from './net'

export const presets: string[] = [
  '31ab0842c23bf715e5530121f906e8d1',
  '4c1fb8ccb10e36a657165f6e7fef14db',
  '4dfbe40f32a4c9291edddbfa369dc0ed',
  '07c8828476e130498bbf887c7e3890f6',
  '086d4c4307d367e9a509fac889222744',
  'aa7477c08a19ca2b65e0ea57f7d69315',
  'f30973ad4ce0351838679fb50ee575b4',
  '87ab5c47e1d9b65caddf6db552d6144c',
  'e0ad1c06b16ae620071f255d44f650da',
  '331fab7f66146df587fd91eb32c727bf',
  'b09b1c31e5b9cd8b972bc3a8953201c5',
  'dd8271f1eb3c4962cea19c99f770650f',
  '412b95a60833e5d56c2765f8cf731237',
]

export async function upload(file: File) {
  return net.pictures.post(file)
}
```

---

### Task 5: Domain Exports

**Files:**

- Create: `src/@/adventures/svc/index.ts`
- Create: `src/@/adventures/index.ts`
- Create: `src/@/adventures/ui/index.ts`
- Modify: `src/@/realtime/svc/events.ts`

**Step 1: Register realtime events**

Add `AdventuresEvents` to `@/realtime/svc/events.ts`:

```typescript
import type { Events as AdventuresEvents } from '@/adventures/svc/net'

export type Events = AccountEvents &
  AdventuresEvents &
  ContactsEvents &
  ...
```

**Step 2: svc/index.ts**

```typescript
export * as net from './net'
export * from './store'
export { get } from './get'
export { create } from './create'
export { assign } from './assign'
export { add } from './add'
export { expense } from './expense'
export { archive } from './archive'
export { leave } from './leave'
export { expose } from './expose'
export * as invitations from './invitations'
export { presets, upload } from './pictures'
```

**Step 3: index.ts**

```typescript
export * from './svc'
```

**Step 4: ui/index.ts** (placeholder, populated as UI components are created)

```typescript
```

**Step 5: Verify**

Run: `npm run check && npm run lint`
Expected: No errors.

**Step 6: Commit**

```
feat(adventures): add domain foundation

Network types, store, service operations, and exports.
```
