# Phase 2: Adventure Editor Screen

[← Back to Plan](../2026-03-10-adventures-implementation.md)

---

## Status

- [x] Task 1: i18n Mount
- [x] Task 2: Extract Leaderboard Component
- [x] Task 3: Members Component
- [x] Task 4: Port `finite()` to Scrollable
- [x] Task 5: Picker Compound Component
- [x] Task 6: Cover Picker
- [x] Task 7: Archive Section Component
- [x] Task 8: Adventure Editor Route
- [x] Task 9: Add Members Route

## Actual Notes

- Editor state and form live in `src/@/adventures/ui/Editor/` (`Context` + `Form`), matching the expenses pattern more closely than the original route-local draft.
- Route files under `src/routes/(private)/adventures/editor/[[id=id]]/` act as orchestration only.
- Create header uses intl key `adventures/editor.title`.

### Task 1: i18n Mount

**Ref:** seed-svelte → i18n.md

Mount adventures intl namespace. Keys are added incrementally per task.

```bash
npx intl mount adventures src/@/adventures/ui/intl
```

---

### Task 2: Extract Leaderboard Component

Reusable list with relative progress bars — used in contacts Tops and adventures Members.

**Files:**
- Create: `src/@/contacts/ui/Leaderboard.svelte`
- Create: `src/@/contacts/ui/Leaderboard.ts`
- Modify: `src/@/contacts/ui/index.ts` — add export
- Modify: `src/@/contacts/ui/Tops.svelte` — refactor to use Leaderboard

**Step 1: Leaderboard.ts**

```typescript
export interface Entry {
  id: string
  value: number
  href?: string
}

export interface Props {
  entries: Entry[]
  sign?: 'positive' | 'negative'
}
```

**Step 2: Leaderboard.svelte**

Renders `accounts/ui/Panel` per entry with progress bars. Fetches accounts by identity internally.

```svelte
<script lang="ts">
  import { Async } from 'svas'
  import { Progress } from '$ui/progress'
  import { accounts } from '@/accounts'
  import { Panel } from '@/accounts/ui'
  import type { Props } from './Leaderboard'

  const { entries, sign = 'negative' }: Props = $props()
  const total = $derived(entries.reduce((sum, e) => sum + Math.abs(e.value), 0))
</script>

<ul class="space-y-2">
  {#each entries as entry (entry.id)}
    <li>
      <Async store={accounts.get(entry.id)}>
        {#snippet awaited(account)}
          <Panel {account} balance={entry.value} href={entry.href} />
        {/snippet}
      </Async>
      {#if entries.length > 1}
        <div class="px-1">
          <Progress
            value={total > 0 ? (Math.abs(entry.value) / total) * 100 : 0}
            class={[
              'h-1',
              sign === 'positive' &&
                'bg-constructive/20 [&_div[data-slot=progress-indicator]]:bg-constructive',
            ]}
          />
        </div>
      {/if}
    </li>
  {/each}
</ul>
```

**Step 3: Export** — add to `src/@/contacts/ui/index.ts`:

```typescript
export { default as Leaderboard } from './Leaderboard.svelte'
```

**Step 4: Refactor Tops.svelte** — replace inline progress bar logic with Leaderboard:

```svelte
<script lang="ts">
  import Leaderboard from './Leaderboard.svelte'
  import { dict } from './intl'
  import type { Props, Sign } from './Tops'

  const { contacts }: Props = $props()
  const LIMIT = 3

  const negative = $derived(
    contacts
      .filter((c) => c.balance < 0)
      .sort((a, b) => a.balance - b.balance)
      .slice(0, LIMIT)
      .map((c) => ({ id: c.identity, value: c.balance, href: `/contacts/${c.identity}/` })),
  )

  const positive = $derived(
    contacts
      .filter((c) => c.balance > 0)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, LIMIT)
      .map((c) => ({ id: c.identity, value: c.balance, href: `/contacts/${c.identity}/` })),
  )
</script>

<div class="space-y-2">
  <h2>{$dict.tops.title}</h2>

  {#if negative.length + positive.length === 0}
    <p class="text-muted-foreground">{$dict.tops.empty}</p>
  {:else}
    <div class="space-y-4">
      {#if negative.length > 0}
        <div class="space-y-1">
          <p>{$dict.tops.negative}</p>
          <Leaderboard entries={negative} />
        </div>
      {/if}
      {#if positive.length > 0}
        <div class="space-y-1">
          <p>{$dict.tops.positive}</p>
          <Leaderboard entries={positive} sign="positive" />
        </div>
      {/if}
    </div>
  {/if}
</div>
```

**Step 5: Clean up Tops.ts** — remove unused `Contact` re-export if no longer needed.

**Verify:** `npm run check && npm run lint`

---

### Task 3: Members Component

Thin wrapper over `Leaderboard` (Task 2). Maps adventure identities + participants to entries.

**Files:**
- Create: `src/@/adventures/ui/Members.svelte`
- Create: `src/@/adventures/ui/Members.ts`

**i18n:**

```bash
npx intl add "adventures/members.title" "Members"
npx intl add "adventures/members.add" "Add members"
```

**Step 1: Members.ts**

```typescript
export interface Props {
  identities: string[]
  participants: Record<string, number>
  class?: string
}
```

**Step 2: Members.svelte**

```svelte
<script lang="ts">
  import { Leaderboard } from '@/contacts/ui'
  import { dict } from './intl'
  import type { Props } from './Members'

  const { identities, participants, class: classes }: Props = $props()

  const entries = $derived(
    identities.map((id) => ({ id, value: participants[id] ?? 0 })),
  )
</script>

<div class={['space-y-2', classes]}>
  <h2>{$dict.members.title}</h2>
  <Leaderboard {entries} sign="positive" />
</div>
```

---

### Task 4: Port `finite()` to Scrollable

**Ref:** seed-svelte → components.md

Port finite scroll from cozylook. Prerequisite for Picker (Task 5).

**Files:**
- Modify: `src/lib/components/scrollable/Scrollable.ts` — port `finite()` + `scrollable()` from cozylook
- Modify: `src/lib/components/scrollable/Scrollable.svelte` — use `scrollable()`, add `mounted`

**Step 1: Port `finite()` to Scrollable.ts**

Source: `../cozylook.svelte/src/lib/components/scrollable/Scrollable.ts`

Add `scrollable()` wrapper (delegates to `finite()` or existing `infinity()`). Add `finite()` — uses `scrollIntoView` with `mounted` flag (instant on first render, smooth after). Extend `align` to include `'end'`.

```typescript
import type { Snippet } from 'svelte'
import type { Attachment } from 'svelte/attachments'

export interface Props {
  children: Snippet
  infinite?: Options['enabled']
  align?: Options['align']
  class?: string
  dir?: 'ltr' | 'rtl'
  scroll?: number
  onscroll?: (e: Event) => void
}

export function scrollable(options: Options, mounted: boolean): Attachment {
  if (options.enabled) return infinity(options)
  return finite(options, mounted)
}

function finite(options: Options, mounted: boolean): Attachment {
  if (options.scroll < 0) return () => undefined

  return (root) => {
    const el = root.children[options.scroll] as HTMLElement
    if (!el) return

    el.scrollIntoView({ behavior: mounted ? 'smooth' : 'instant', inline: options.align, block: 'nearest' })
  }
}

function infinity(options: Options): Attachment {
  if (!options.enabled) return () => undefined

  return (root) => {
    const length = root.children.length / INFINITY

    if (length === 0) return

    const anchor = root.children[HALF * length + options.scroll] as HTMLElement
    const width = (root.children[length] as HTMLElement).offsetLeft

    let chill = false

    function onscrollend(e: Event) {
      if (chill) return

      const pos = Math.floor((root.scrollLeft / root.scrollWidth) * INFINITY)

      if (pos === HALF) return

      chill = true
      setTimeout(() => (chill = false), 1_000)
      setTimeout(() => (root.scrollLeft += (HALF - pos) * width), 100)
    }

    root.scrollLeft = options.align === 'start' ? anchor.offsetLeft : anchor.offsetLeft - root.clientWidth / 2 + anchor.clientWidth / 2
    root.addEventListener('scrollend', onscrollend)

    return () => {
      root.removeEventListener('scrollend', onscrollend)
    }
  }
}

export const INFINITY = 11
const HALF = (INFINITY - 1) / 2

interface Options {
  enabled: boolean
  align: 'start' | 'center' | 'end'
  scroll: number
}
```

**Step 2: Update Scrollable.svelte**

Replace `infinity` import with `scrollable`. Add `mounted` state. Use `{@attach scrollable(…, mounted)}`.

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  import { cn } from '$lib/utils'
  import { scrollable, INFINITY, type Props } from './Scrollable'

  const {
    children,
    infinite = false,
    align = 'start',
    class: classes,
    dir,
    scroll = 0,
    onscroll,
  }: Props = $props()

  let mounted = $state(false)
  onMount(() => { mounted = true })
</script>

<div {dir}>
  <div
    {@attach scrollable({ enabled: infinite, align, scroll }, mounted)}
    {onscroll}
    class={cn(
      'px-4 flex overflow-x-auto no-scrollbar snap-x snap-mandatory overscroll-x-contain',
      classes,
    )}
  >
    {@render children?.()}
    {#if infinite}
      {#each { length: INFINITY - 1 }}
        {@render children?.()}
      {/each}
    {/if}
  </div>
</div>
```

> `scroll=0` + `align='start'` on non-infinite Scrollables → `scrollIntoView(child[0], inline:'start')` → no visible shift (child is already at start). Backward compatible.

**Verify:** `npm run check && npm run lint`

---

### Task 5: Picker Compound Component

**Ref:** seed-svelte → components.md (Compound Components, Context)

Generic index-based horizontal picker. Root provides `Scrollable` + shared context. Option wraps `Button` with auto-registration. No `$effect` — scroll handled by Scrollable's `scroll` prop (Task 4).

**Used by:** Task 6 (Cover Picker), Phase 5 Task 2 (Adventure Selector).

**Files:**
- Create: `src/lib/components/picker/Context.ts`
- Create: `src/lib/components/picker/Root.ts`
- Create: `src/lib/components/picker/Root.svelte`
- Create: `src/lib/components/picker/Option.ts`
- Create: `src/lib/components/picker/Option.svelte`
- Create: `src/lib/components/picker/index.ts`

**Step 1: Context.ts**

All Options register (both pickable and non-pickable) — Root tracks DOM order. `indexOf` returns position among pickable items only.

```typescript
import { setContext as set, getContext as get } from 'svelte'

export interface Entry {
  id: symbol
  pickable: boolean
}

export interface Context {
  get picked(): number
  pick: (index: number) => void
  register: (id: symbol, pickable: boolean) => void
  unregister: (id: symbol) => void
  indexOf: (id: symbol) => number
  snap: 'start' | 'center' | 'end'
}

const KEY = Symbol('picker')
export const getContext = () => get<Context>(KEY)
export const setContext = (ctx: Context) => set(KEY, ctx)
```

**Step 4: Root.ts**

```typescript
import type { Snippet } from 'svelte'

export interface Props {
  picked: number
  onpick: (index: number) => void
  snap?: 'start' | 'center' | 'end'
  children: Snippet
  class?: string
}
```

**Step 5: Root.svelte**

Tracks all children in `entries`. Derives `pickable` subset. Computes Scrollable `scroll` from `picked` → finds Nth pickable entry → finds its position among all entries (= DOM child index).

```svelte
<script lang="ts">
  import { Scrollable } from '$com/scrollable'
  import { setContext, type Entry } from './Context'
  import type { Props } from './Root'

  const { picked, onpick, snap = 'start', children, class: classes }: Props = $props()

  let entries = $state<Entry[]>([])
  const picks = $derived(entries.filter((e) => e.pickable))

  const scroll = $derived(
    picked >= 0 && picked < picks.length
      ? entries.findIndex((e) => e.id === picks[picked].id)
      : -1,
  )

  setContext({
    get picked() { return picked },
    pick: onpick,
    register: (id, pickable) => entries.push({ id, pickable }),
    unregister: (id) => { entries = entries.filter((e) => e.id !== id) },
    indexOf: (id) => picks.findIndex((e) => e.id === id),
    snap,
  })
</script>

<Scrollable scroll={scroll} align={snap} class={classes}>
  {@render children()}
</Scrollable>
```

**Step 6: Option.ts**

Extends `ButtonProps` — inherits variant, size, href, disabled, class, style, etc.

```typescript
import type { ButtonProps } from '$ui/button'

export type Props = ButtonProps & {
  pickable?: boolean
}
```

**Step 7: Option.svelte**

Registers on init, unregisters on destroy. No `$effect` — scroll delegated to Scrollable via Root's `scroll` prop. Built-in `picked` styling matches `$com/Panel`'s `selected` look: `outline-muted-foreground/50 outline-2` + `bg-accent`. Consumers don't need `data-[picked]:*` classes.

```svelte
<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Button } from '$ui/button'
  import { getContext } from './Context'
  import type { Props } from './Option'

  const SNAP = { start: 'snap-start', center: 'snap-center', end: 'snap-end' } as const

  const ctx = getContext()
  const { pickable = true, onclick, class: classes, children, ...rest }: Props = $props()

  const id = Symbol()
  ctx.register(id, pickable)
  onDestroy(() => ctx.unregister(id))

  const index = $derived(pickable ? ctx.indexOf(id) : -1)
  const picked = $derived(pickable && ctx.picked === index)
</script>

<div class={['h-full transition-all', picked && 'outline-muted-foreground/50 outline-2 rounded-lg']}>
  <Button
    {...rest}
    data-picked={picked ? '' : undefined}
    class={['h-full', SNAP[ctx.snap], picked && 'bg-accent dark:bg-accent', classes]}
    onclick={(e) => {
      if (pickable) ctx.pick(index)
      onclick?.(e)
    }}>
    {#if children}
      {@render children()}
    {/if}
  </Button>
</div>
```

**Step 8: index.ts**

```typescript
export { default as Root } from './Root.svelte'
export { default as Option } from './Option.svelte'
```

**Usage pattern:**

```svelte
import * as Picker from '$com/picker'

<input type="file" class="hidden" bind:this={input} />

<Picker.Root picked={index} onpick={(i) => index = i} snap="center">
  <Picker.Option pickable={false} onclick={() => input?.click()}>Upload</Picker.Option>
  {#each items as item (item.id)}
    <Picker.Option>{item.name}</Picker.Option>
  {/each}
</Picker.Root>
```

> **Styling:** `picked` styling (outline + bg-accent) is built into Option — matches `$com/Panel`'s `selected` look. No need for consumer `data-[picked]:*` classes. `data-picked` attribute still set for extra customization if needed.

> **Important:** All Scrollable children must be `<Picker.Option>`. Non-Option elements (e.g. `<input>`) must be placed outside `<Picker.Root>` — otherwise DOM child indices break the scroll calculation.

---

### Task 6: Cover Picker

**Ref:** Uses `$com/picker` (Task 5). Upload = `pickable={false}` Option. Custom cover inserted as first pickable after upload.

**Files:**
- Create: `src/@/adventures/ui/Cover.svelte`
- Create: `src/@/adventures/ui/Cover.ts`

**i18n:**

```bash
npx intl add "adventures/editor.cover" "Cover"
npx intl add "adventures/editor.upload" "Choose your own"
```

```typescript
export interface Props {
  picture: string
  onchange: (id: string) => void
}
```

**Design:** Upload card is FIRST in horizontal scroll (like cozylook Dummies pattern — Camera icon + label, same card dimensions as covers). Cover cards are landscape images. Picked styling is built into Option (outline + bg-accent from Panel pattern).

```svelte
<script lang="ts">
  import { ImageUp } from '@lucide/svelte'
  import { Spinner } from '$com/spinner'
  import * as Picker from '$com/picker'
  import { url } from '@/media/ui/Picture'
  import { upload, presets } from '@/adventures'
  import { dict } from './intl'
  import type { Props } from './Cover'

  const { picture, onchange }: Props = $props()

  let input = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)
  let custom = $state<string | null>(presets.includes(picture) ? null : picture || null)

  const all = $derived(custom ? [custom, ...presets] : presets)
  const picked = $derived(all.indexOf(picture))

  function onpick(index: number) {
    onchange(all[index])
  }

  async function handleUpload(e: Event) {
    const target = e.target as HTMLInputElement
    if (!target.files?.length) return
    uploading = true
    const result = await upload(target.files[0])
    uploading = false
    target.value = ''
    if (result instanceof Error) return
    custom = result.id
    onchange(result.id)
  }
</script>

<div class="space-y-2">
  <h2>{$dict.editor.cover}</h2>
  <input type="file" accept="image/*" bind:this={input} onchange={handleUpload} class="hidden" />

  <Picker.Root {picked} {onpick} snap="start" class="gap-2 py-1">
    <Picker.Option
      pickable={false}
      variant="outline"
      onclick={() => input?.click()}
      disabled={uploading}
      class="w-44 shrink-0 flex-col gap-2 items-center justify-center text-muted-foreground">
      {#if uploading}
        <Spinner class="size-6" />
      {:else}
        <ImageUp class="size-6" />
      {/if}
      <span class={['text-xs', uploading && 'hidden']}>{$dict.editor.upload}</span>
    </Picker.Option>

    {#each all as id (id)}
      <Picker.Option
        class="w-44 aspect-17/12 shrink-0 bg-cover bg-center rounded-lg overflow-hidden"
        style:background-image="url({url({ id, path: '/pictures/', variant: '600x400!' })})">
      </Picker.Option>
    {/each}
  </Picker.Root>
</div>
```

> After upload, `custom` is set → appears first in `all` → `onchange(result.id)` triggers parent to update `picture` → `picked` re-derives to index 0 → Picker snaps to it.

---

### Task 7: Archive Section Component

**Files:**
- Create: `src/@/adventures/ui/Archive.svelte`
- Create: `src/@/adventures/ui/Archive.ts`

**i18n:**

```bash
npx intl add "adventures/finish.title" "Finish the adventure"
npx intl add "adventures/finish.description" "Archiving the adventure will remove it from the new expense screen and put it at the back of your adventure."
npx intl add "adventures/finish.button" "Archive adventure"
npx intl add "adventures/finish.delete" "Delete adventure"
```

Finish section with description + destructive button. Icon: `Archive` if has expenses, `Trash2` if empty. Shown in editor for existing adventures.

```svelte
<script lang="ts">
  import { Archive as ArchiveIcon, Trash2 } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { dict } from './intl'
  import type { Props } from './Archive'

  const { id, empty }: Props = $props()
</script>

<div class="space-y-2">
  <h2>{$dict.finish.title}</h2>
  <p class="text-sm text-muted-foreground">{$dict.finish.description}</p>
  <Button variant="destructive" href={`/adventures/editor/${id}/archive/`}>
    {#if empty}
      <Trash2 />{$dict.finish.delete}
    {:else}
      <ArchiveIcon />{$dict.finish.button}
    {/if}
  </Button>
</div>
```

---

### Task 8: Adventure Editor Route

**Files:**
- Create: `src/@/adventures/ui/Editor/Context.svelte`
- Create: `src/@/adventures/ui/Editor/Context.ts`
- Create: `src/@/adventures/ui/Editor/Form.svelte`
- Create: `src/@/adventures/ui/Editor/Form.ts`
- Create: `src/@/adventures/ui/Editor/index.ts`
- Create: `src/routes/(private)/adventures/editor/[[id=id]]/+layout.svelte`
- Create: `src/routes/(private)/adventures/editor/[[id=id]]/+page.svelte`

**i18n:**

```bash
npx intl add "adventures/editor.name" "Adventure name"
npx intl add "adventures/editor.note" "All members will see this name"
npx intl add "adventures/editor.info" "Adventures are for those who want to spend equally, be it a voyage together, bar tab or just a common household spendings. The debts in adventure are not between individual users, but to each fellow member helping keep equal tabs."
```

Layout: wraps children in `@/adventures/ui/Editor.Context` (same ownership pattern as expenses editor).

Page structure (top→bottom):
1. Header in route (`New Adventure` / `Settings`)
2. Info `Panel` in route
3. `@/adventures/ui/Editor.Form` with title input + note, cover picker, members, add-members button, archive block, submit action

On submit:
- Create: `adventures.create({ title, identities, picture })`
- Edit: `adventures.assign(id, { title, picture })`

---

### Task 9: Add Members Route

**Files:**
- Create: `src/routes/(private)/adventures/editor/[[id=id]]/add/+page.svelte`

Contact list with selection. For new adventures — stores selected identities in editor state. For existing adventures — calls `adventures.add(id, { participants })` to add new members.

Follow `contacts/groups/[id=id]/add/+page.svelte` pattern.

---

**Update UI Exports** — add Phase 2 components to `@/adventures/ui/index.ts`:

```typescript
export { default as Members } from './Members.svelte'
export { default as Cover } from './Cover.svelte'
export { default as Archive } from './Archive.svelte'
```

**Verify:** `npm run check && npm run lint`

---

### Acceptance (Agent UI Testing)

Agent opens app in browser and verifies:

- [ ] Navigate to `/adventures/editor/` — editor page renders (title input, cover picker, submit action)
- [ ] Cover picker: horizontal scroll of preset covers visible, tap selects (outline highlight), "Choose your own" upload button present
- [ ] Enter title, select cover → tap submit → adventure created, redirects to view
- [ ] Navigate to `/adventures/editor/{id}/` — existing adventure loads (title prefilled, cover selected)
- [ ] "Add members" button → navigates to `/adventures/editor/{id}/add/`
- [ ] Add members page: contact list renders, can select contacts
- [ ] "Finish the adventure" section visible in edit mode (not in create mode)
- [ ] Contacts page: Tops section still renders correctly (Leaderboard refactor didn't break)

---

**Commit:**

```
feat(adventures): add editor screen

Editor route (create/edit), add members, cover picker, archive section.
Leaderboard extraction, Picker compound component.
```
