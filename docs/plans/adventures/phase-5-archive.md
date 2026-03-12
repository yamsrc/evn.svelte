# Phase 5: Archive Screen

[← Back to Plan](../2026-03-10-adventures-implementation.md)

---

### Task 1: Add `expose` to Groups Domain

**Files:**
- Modify: `src/@/groups/svc/net/interface.ts` — add expose network call
- Create: `src/@/groups/svc/expose.ts`
- Modify: `src/@/groups/svc/index.ts` — export expose

**Step 1: Add expose to groups network layer**

In `interface.ts`, add import and function:

```typescript
import type { Contact } from '@/contacts/svc/net'

export async function expose(identity: string, id: string): Promise<Contact[] | Error> {
  return groups.json(`${identity}/${id}/contacts/`)
}
```

**Step 2: Add groups expose service**

```typescript
// src/@/groups/svc/expose.ts
import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import type { Contact } from '@/contacts/svc/net'

export async function expose(id: string): Promise<Contact[] | Error> {
  const me = await having(account)

  return await net.expose(me.id, id)
}
```

**Step 3: Export from groups**

Add `export { expose } from './expose'` to `src/@/groups/svc/index.ts`.

**Verify:** `npm run check && npm run lint`

---

### Task 2: Create `@/contacts/ui/Graph`

**Ref:** Extracted from `src/@/groups/ui/Graph.svelte` (165 lines). Pure presentational — no domain imports, no store access.

**Files:**
- Create: `src/@/contacts/ui/Graph.ts`
- Create: `src/@/contacts/ui/Graph.svelte`
- Modify: `src/@/contacts/ui/index.ts` — add Graph export

**Step 1: Graph.ts props**

```typescript
import type { Account } from '@/accounts'
import type { Contact } from '@/contacts'

export type AccountLike = Pick<Account, 'id' | 'name' | 'picture'>
export type ContactLike = Pick<Contact, 'identities' | 'balance'>

export interface Props {
  contacts: ContactLike[]
  accounts: AccountLike[]
  class?: string
}
```

**Step 2: Graph.svelte** — d3-force graph with nodes (member pictures/initials) and curved debt arrows. Changes from groups Graph:

- Props: `contacts: ContactLike[]`, `accounts: AccountLike[]`, `class?` (no domain imports)
- Derive `byId` map from `accounts`, `members` from unique `contacts[*].identities`, `debts` from `contact.balance` sign

```svelte
<script lang="ts">
  import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force'
  import { locale } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { url } from '@/media/ui/Picture'
  import type { Props } from './Graph'

  const { contacts, accounts, class: classes }: Props = $props()

  // ... types Node, Edge; constants W=600 H=400 R=22 PAD=R+20

  const byId = $derived(new Map(accounts.map((a) => [a.id, a])))

  const members = $derived(
    [...new Set(contacts.flatMap((c) => c.identities))].map((id) => {
      const a = byId.get(id)
      return { id, name: a?.name ?? id, picture: a?.picture }
    }),
  )

  const debts = $derived(
    contacts
      .filter((c) => c.balance !== 0)
      .map((c) => ({
        from: c.balance > 0 ? c.identities[0] : c.identities[1],
        to: c.balance > 0 ? c.identities[1] : c.identities[0],
        amount: Math.abs(c.balance),
      })),
  )

  // ... graph simulation, fitBounds, distToSeg, geom, path, mid — identical to old groups Graph
</script>

<!-- SVG template identical to old groups Graph: arrow markers, clipPaths, edges with currency labels, nodes with picture/initial + first name -->
```

**Step 3:** Export `Graph` from `src/@/contacts/ui/index.ts`:

```typescript
export { default as Graph } from './Graph.svelte'
```

**Verify:** `npm run check && npm run lint`

---

### Task 3: Migrate Groups to New Graph

**Files:**
- Delete: `src/@/groups/ui/Graph.svelte`
- Delete: `src/@/groups/ui/Graph.ts`
- Modify: `src/@/groups/ui/index.ts` — remove Graph export
- Modify: `src/routes/(protected)/dev/components/graph/+page.svelte` — use `@/contacts/ui/Graph` + `groups.expose(id)`

**Step 1:** Update dev graph page — replace `@/groups/ui/Graph` imports with:

```svelte
import { Graph } from '@/contacts/ui'
import { groups, expose } from '@/groups'
```

Remove old `group`/`account` props. Add group `Select` dropdown, then graph in same `Section > Panel` pattern as archive page:

```svelte
{#if id}
  <Section>
    <Panel class="aspect-3/2 flex items-center justify-center">
      {#await expose(id)}
        <Loader />
      {:then contacts}
        <!-- resolve accounts → <Graph> same as archive page -->
      {/await}
    </Panel>
  </Section>
{/if}
```

**Step 2:** Delete `src/@/groups/ui/Graph.svelte` and `Graph.ts`, remove Graph from `src/@/groups/ui/index.ts`.

**Verify:** `npm run check && npm run lint` + verify dev graph page still works

---

### Task 4: Adventures Expose + Archive Service

**Files:**
- Modify: `src/@/adventures/svc/net/interface.ts` — add `expose`, `put` (archive), `ArchiveInput`
- Create: `src/@/adventures/svc/expose.ts`
- Create: `src/@/adventures/svc/archive.ts`
- Modify: `src/@/adventures/svc/index.ts` — export expose, archive

**Step 1: Network layer** — add to `interface.ts`:

```typescript
import type { Contact } from '@/contacts/svc/net'

export interface ArchiveInput {
  merge?: boolean
}

export async function put(identity: string, id: string, body: ArchiveInput): Promise<Adventure | Error> {
  return adventures.json(`${identity}/${id}`, { method: 'PUT', body })
}

export async function expose(identity: string, id: string): Promise<Contact[] | Error> {
  return adventures.json(`${identity}/${id}/contacts/`)
}
```

**Step 2: Expose service**

```typescript
// src/@/adventures/svc/expose.ts
import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function expose(id: string) {
  const me = await having(account)

  return net.expose(me.id, id)
}
```

**Step 3: Archive service**

```typescript
// src/@/adventures/svc/archive.ts
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

**Step 4:** Export from `src/@/adventures/svc/index.ts`:

```typescript
export { archive } from './archive'
export { expose } from './expose'
```

**Verify:** `npm run check && npm run lint`

---

### Task 5: `ago` Helper + `Archived` Component

**Files:**
- Create: `src/lib/tools/ago.ts`
- Modify: `src/lib/tools/index.ts` — add export
- Create: `src/@/adventures/ui/Archived.ts`
- Create: `src/@/adventures/ui/Archived.svelte`
- Modify: `src/@/adventures/ui/index.ts` — add Archived export

**i18n:**

```bash
npx intl add "adventures/archived" "Archived" "label prefix for archived adventure date"
```

**Step 1: ago.ts** — relative/absolute date: "today"/"yesterday" (<2 days) or "Mar 10" (≥2 days)

```typescript
import type { Locale } from '$lib/intl'

export function ago(timestamp: number, locale: Locale): string {
  const days = Math.round((Date.now() - timestamp) / 86_400_000)

  if (days < 2)
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-days, 'day')

  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(timestamp)
}
```

Export from `src/lib/tools/index.ts`: `export { ago } from './ago'`

**Step 2: Archived.ts**

```typescript
export interface Props {
  at: number
}
```

**Step 3: Archived.svelte** — icon + "Archived {ago}"

```svelte
<script lang="ts">
  import { Archive } from '@lucide/svelte'
  import { locale } from '$lib/intl'
  import { ago } from '$lib/tools'
  import { dict } from './intl'
  import type { Props } from './Archived'

  const { at }: Props = $props()
</script>

<p class="flex items-center gap-1.5 text-sm font-bold">
  <Archive class="size-4" />
  <span>{$dict.archived} {ago(at, $locale)}</span>
</p>
```

**Step 4:** Export from `src/@/adventures/ui/index.ts`: `export { default as Archived } from './Archived.svelte'`

**Verify:** `npm run check && npm run lint`

---

### Task 6: Archive Action Component

Action card displayed in editor form. Two variants: delete (empty adventure) or archive (has expenses). Links to archive route.

**Files:**
- Create: `src/@/adventures/ui/Archive.ts`
- Create: `src/@/adventures/ui/Archive.svelte`
- Modify: `src/@/adventures/ui/index.ts` — add Archive export
- Modify: `src/@/adventures/ui/Editor/Form.svelte` — add Archive section

**i18n:**

```bash
npx intl add "adventures/finish.delete.title" "Delete adventure" "heading for delete section"
npx intl add "adventures/finish.delete.description" "This adventure has no expenses" "description under delete heading"
npx intl add "adventures/finish.delete.button" "!js (title) => \`Delete \${title}\`" "button label with title"
npx intl add "adventures/finish.archive.title" "Archive adventure" "heading for archive section"
npx intl add "adventures/finish.archive.description" "Archive this adventure and settle balances" "description under archive heading"
npx intl add "adventures/finish.archive.button" "Archive" "archive button label"
```

**Step 1: Archive.ts**

```typescript
export interface Props {
  id: string
  empty: boolean
  title: string
}
```

**Step 2: Archive.svelte** — snippet-based action card, links to `/adventures/{id}/archive/`

```svelte
<script lang="ts">
  import { Archive as ArchiveIcon, Trash2 } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { dict } from './intl'
  import type { Props } from './Archive'
  import type { Snippet } from 'svelte'

  const { id, empty, title }: Props = $props()
</script>

{#snippet action(heading: string, description: string, icon: Snippet, label: string)}
  <div class="space-y-2">
    <h2>{heading}</h2>
    <p class="text-sm text-muted-foreground">{description}</p>
    <Button variant="secondary" size="lg" class="w-full" href={`/adventures/${id}/archive/`}>
      {@render icon()}
      {label}
    </Button>
  </div>
{/snippet}

{#snippet trash()}<Trash2 />{/snippet}
{#snippet archive()}<ArchiveIcon />{/snippet}

{#if empty}
  {@render action(
    $dict.finish.delete.title,
    $dict.finish.delete.description,
    trash,
    $dict.finish.delete.button(title),
  )}
{:else}
  {@render action(
    $dict.finish.archive.title,
    $dict.finish.archive.description,
    archive,
    $dict.finish.archive.button,
  )}
{/if}
```

**Step 3:** Export from `src/@/adventures/ui/index.ts`: `export { default as Archive } from './Archive.svelte'`

**Step 4:** Add to editor form `src/@/adventures/ui/Editor/Form.svelte` — show Archive section only for existing adventures:

```svelte
import { Archive, Cover, Members } from '@/adventures/ui'
```

```svelte
{#if id !== undefined}
  <Archive {id} empty={value.expenses.length === 0} title={value.title} />
{/if}
```

**Verify:** `npm run check && npm run lint`

---

### Task 7: Archive Route

**Files:**
- Create: `src/routes/(private)/adventures/[id=id]/archive/+page.svelte`

**i18n:**

```bash
npx intl add "adventures/archive.header" "!js (title, empty) => empty ? \`Deleting \${title}\` : \`Archiving \${title}\`"
npx intl add "adventures/archive.warning" "Debts from this adventure can be moved to regular balances or kept inside the archive." "info panel text"
npx intl add "adventures/archive.delete.description" "This adventure has no expenses and will be deleted" "description for delete mode"
npx intl add "adventures/archive.delete.button" "Delete adventure" "hold button for delete"
npx intl add "adventures/balance.header" "Balances" "section header for balance options"
npx intl add "adventures/balance.merge" "Move balances to the regular debts"
npx intl add "adventures/balance.keep" "Keep balances in the archive"
```

**Two modes** based on `adventure.expenses.length`:

- **Has expenses** → info warning + graph in Panel + RadioGroup (merge/keep) + hold "Archive"
- **No expenses** → description + hold "Delete" (backend soft-deletes)

```svelte
<script lang="ts">
  import { Archive as ArchiveIcon, Info, Trash2 } from '@lucide/svelte'
  import { ok, Async, combined } from 'svas'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Hold } from '$com/buttons'
  import { Loader } from '$com/loader'
  import { Actions } from '$com/shell'
  import * as RadioGroup from '$ui/radio-group'
  import { accounts } from '@/accounts'
  import { adventures, archive, expose } from '@/adventures'
  import { dict } from '@/adventures/ui/intl'
  import { actionVariants, Section, Header, Panel } from '@/app/ui'
  import { Graph } from '@/contacts/ui'
  import type { Adventure } from '@/adventures'

  const id = $derived(page.params.id) as string

  const adventure: Adventure | undefined = $derived(
    ok($adventures) ? $adventures.find((a) => a.id === id) : undefined,
  )

  const empty = $derived(adventure ? adventure.expenses.length === 0 : true)

  let merge = $state(true)
  let busy = $state(false)

  async function submit() {
    if (!id || busy) return
    busy = true
    const result = await archive(id, empty ? undefined : merge)
    busy = false
    if (result instanceof Error) return
    goto(empty ? '/' : `/adventures/${id}/`)
  }
</script>

<!-- Header: $dict.archive.header(adventure.title, empty) -->

<!-- empty mode: description + Hold(destructive, Trash2) → submit -->

<!-- non-empty mode, top to bottom: -->
<!--   1. Panel: Info icon + $dict.archive.warning -->
<!--   2. Panel(aspect-3/2): expose(id) → resolve accounts → <Graph> (same pattern as dev graph page) -->
<!--   3. Panel: RadioGroup merge/keep ($dict.balance.*) -->
<!--   4. Hold(destructive, ArchiveIcon) → submit -->
```

> All `Hold` buttons use `class={actionVariants({ variant: 'destructive' })}` + `sr-only` label span.

---

### Task 8: View Page Integration + Expenses Delete Shortcut

**Files:**
- Modify: `src/routes/(private)/adventures/[id=id]/+page.svelte` — show Archived badge, hide settings/create if archived
- Modify: `src/@/adventures/ui/Expenses.svelte` — show delete button when no expenses

**Step 1:** View page — 3 changes, all gated on `adventure.archived`:
- Wrap `<Header.Actions>` (settings button) in `{#if !adventure.archived}`
- Add `<Archived at={adventure.archivedAt} />` section above cover (when `archived && archivedAt`)
- Wrap bottom `<Actions>` (create expense button) in `{#if !adventure.archived}`

**Step 2:** Expenses component — add `{:else}` branch when no expenses: description text + `Button` (secondary, Trash2) linking to `archive/` (relative, resolves to `/adventures/{id}/archive/`) with `$dict.finish.delete.button(title)`

**Verify:** `npm run check && npm run lint`

---

### Acceptance (Agent UI Testing)

Agent opens app in browser and verifies:

- [x] Adventure with expenses → navigate to `/adventures/{id}/archive/` — header "Archiving {title}", info warning panel, graph renders in Panel (d3 nodes + debt arrows), RadioGroup with merge/keep options
- [x] Toggle radio group → selection changes between merge/keep
- [x] Hold archive button → adventure archived, redirects to view (archived state)
- [x] View page: archived adventure shows "Archived {ago}" badge, settings button hidden, create action hidden
- [x] Adventure without expenses → archive page shows "Deleting {title}" + description, hold "Delete adventure" → adventure removed, redirects to home
- [x] Adventure without expenses → view page shows delete button in expenses section
- [x] Editor form: existing adventure shows Archive/Delete action card at bottom
- [x] Groups dev page: graph still renders correctly after refactoring to `@/contacts/ui/Graph`

---

**Commit:**

```
feat(adventures): add archive screen

Extract Graph to @/contacts/ui — generic d3 force graph.
Groups dev page uses new Graph. Archive route with info warning,
graph, RadioGroup balance choice, hold-to-archive.
Delete mode for empty adventures. Archived badge on view page.
Archive action card in editor form.
```
