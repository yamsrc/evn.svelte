# Phase 4: Adventure Expense Editor & View

[← Back to Plan](../2026-03-10-adventures-implementation.md)

---

Architecture decision: adventure expenses get their own standalone form and routes under `@/adventures`, rather than modifying the existing expense editor. This keeps the adventure expense flow simple (single payer, no splits) and avoids polluting the regular expense editor with adventure-specific logic. The `Selector` component bridges both flows — rendered in the regular editor, it navigates to adventure routes preserving draft state.

---

### Task 1: Adventure Expense Form

**Files:**

- Create: `src/@/adventures/ui/expenses/form/Description.svelte`
- Create: `src/@/adventures/ui/expenses/form/Description.ts`
- Create: `src/@/adventures/ui/expenses/form/Total.svelte`
- Create: `src/@/adventures/ui/expenses/form/Total.ts`
- Create: `src/@/adventures/ui/expenses/form/PayerSelect.svelte`
- Create: `src/@/adventures/ui/expenses/form/PayerSelect.ts`
- Create: `src/@/adventures/ui/expenses/form/Form.svelte`
- Create: `src/@/adventures/ui/expenses/form/Form.ts`
- Create: `src/@/adventures/ui/expenses/form/index.ts`

Simplified 3-field form: title+location, amount, payer. No participant shares — adventure expenses are single-payer.

**Form.ts** props:

```typescript
import type { Adventure, Expense } from '@/adventures'

export interface Props {
  adventure: Adventure
  expense: Partial<Expense>
}
```

**Form.svelte** seeds state from `expense` prop, validates, submits, exposes `draft()` and `attach()`:

```svelte
<script lang="ts">
  import { Check } from '@lucide/svelte'
  import { back } from '$com/history'
  import { Actions } from '$com/shell'
  import { dict as common } from '$lib/intl'
  import { onsubmit } from '$lib/tools'
  import * as adventures from '@/adventures'
  import { Action, Section } from '@/app/ui'
  import { account as me } from '@/iam'
  import Description from './Description.svelte'
  import PayerSelect from './PayerSelect.svelte'
  import Total from './Total.svelte'
  import type { Props } from './Form'
  import type { Expense } from '@/adventures'

  const { adventure, expense }: Props = $props()

  const members = $derived(Object.keys(adventure.participants))

  function seed(e: Partial<Expense>, me?: string) {
    const members = Object.keys(adventure.participants)

    return {
      title: e.title ?? '',
      location: e.location,
      attachments: [...(e.attachments ?? [])],
      amount: e.amount ?? 0,
      payer: e.payer ?? (me && members.includes(me) ? me : undefined),
    }
  }

  // svelte-ignore state_referenced_locally
  const form = $state(seed(expense, $me?.id))

  let busy = $state(false)
  let submitButton = $state<HTMLButtonElement | null>(null)

  const payload = $derived(
    form.title.trim().length > 0 && form.amount > 0 && form.payer !== undefined
      ? {
          title: form.title,
          amount: form.amount,
          payer: form.payer,
          location: form.location,
          attachments: form.attachments,
        }
      : null,
  )

  const _draft = $derived({
    title: form.title,
    location: form.location,
    attachments: form.attachments,
  })

  export function draft() {
    return _draft
  }

  export function attach(...ids: string[]) {
    form.attachments.push(...ids)
  }

  async function submit() {
    if (!payload) return

    busy = true

    const result = await adventures.expense(adventure.id, [payload])

    busy = false

    if (result instanceof Error) return

    await back(`/adventures/${adventure.id}/`)
  }
</script>

<Section>
  <form onsubmit={onsubmit(submit)} class="space-y-5">
    <Description bind:title={form.title} bind:location={form.location} />
    <Total bind:amount={form.amount} />
    <PayerSelect bind:payer={form.payer} {members} />

    <button bind:this={submitButton} type="submit" class="sr-only">
      {$common.expenses.form.save}
    </button>
  </form>
</Section>

<Actions>
  <Action id="adventures-expense-save-button" disabled={busy || !payload} onclick={() => submitButton?.click()}>
    <Check />
    <span>{$common.expenses.form.save}</span>
  </Action>
</Actions>
```

**Description.svelte** — title + location inputs:

```svelte
<script lang="ts">
  import { dict } from '$lib/intl'
  import { Input } from '$ui/input'
  import type { Props } from './Description'

  let { title = $bindable(), location = $bindable() }: Props = $props()
</script>

<fieldset class="space-y-2">
  <Input
    id="adventures-expense-title-input"
    bind:value={title}
    name="title"
    autofocus={title === ''}
    required
    placeholder={$dict.expenses.form.title.placeholder}
    class="text-2xl font-bold" />
  <Input
    id="adventures-expense-location-input"
    bind:value={location}
    name="location"
    placeholder={$dict.expenses.form.location.placeholder} />
</fieldset>
```

**Total.svelte** — amount with `CoinsInput`:

```svelte
<script lang="ts">
  import { dict } from '$lib/intl'
  import { CoinsInput } from '@/app/ui'
  import type { Props } from './Total'

  let { amount = $bindable() }: Props = $props()
</script>

<div class="flex items-center justify-between gap-4">
  <div class="ps-3">{$dict.expenses.spendings.total}</div>
  <CoinsInput
    id="adventures-expense-total-input"
    class="max-w-2/3"
    inputClass="text-3xl font-bold"
    bind:value={amount} />
</div>
```

**PayerSelect.svelte** — Select dropdown over adventure members:

```svelte
<script lang="ts">
  import { Async } from 'svas'
  import { Select, SelectTrigger, SelectContent, SelectItem } from '$ui/select'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { dict } from '@/adventures/ui/intl'
  import { account as me } from '@/iam'
  import type { Props } from './PayerSelect'

  let { payer = $bindable(), members }: Props = $props()
</script>

<div class="space-y-2">
  <h2>{$dict.expenses.paidBy}</h2>

  <Select type="single" value={payer} onValueChange={(v) => (payer = v)}>
    {#if payer}
      <Async store={accounts.get(payer)}>
        {#snippet awaited(account)}
          <SelectTrigger id="adventures-expense-payer-trigger" class="w-full">
            <div class="flex items-center gap-2">
              <Picture {account} class="size-6" />
              <span>{account.id === $me?.id ? $dict.me : account.name}</span>
            </div>
          </SelectTrigger>
        {/snippet}
      </Async>
    {:else}
      <SelectTrigger id="adventures-expense-payer-trigger" class="w-full">
        <span class="text-muted-foreground">{$dict.expenses.paidBy}</span>
      </SelectTrigger>
    {/if}
    <SelectContent collisionPadding={{ top: 64, bottom: 88 }}>
      {#each members as mid (mid)}
        <Async store={accounts.get(mid)}>
          {#snippet awaited(account)}
            <SelectItem value={mid}>
              <div class="flex items-center gap-2">
                <Picture {account} class="size-6" />
                <span>{mid === $me?.id ? $dict.me : account.name}</span>
              </div>
            </SelectItem>
          {/snippet}
        </Async>
      {/each}
    </SelectContent>
  </Select>
</div>
```

---

### Task 2: Adventure Selector

**Ref:** Uses `$com/picker` (Phase 2 Task 5), `Avatars` from `@/app/ui`.

**Files:**

- Create: `src/@/adventures/ui/Selector.svelte`
- Create: `src/@/adventures/ui/Selector.ts`

Horizontal picker: index 0 = "Regular spending" (pencil icon), index 1+ = active adventures (cover image + title + avatars). Rendered only when active adventures exist.

```typescript
export interface Props {
  id?: string
  draft: { title: string; location?: string; attachments: string[] }
  onchange?: (id: string) => void
}
```

Navigation logic:
- Pick "Regular spending" → `goto('/expenses/editor/', { replaceState: true, state: { expense: draft } })`
- Pick adventure from regular editor → `goto('/adventures/{id}/expenses/editor/', { replaceState: true, state: { expense: draft } })`
- Switch between adventures → `replaceState(path, state)` + `onchange(id)` (no full navigation, re-keys form)

```svelte
<script lang="ts">
  import { Pencil } from '@lucide/svelte'
  import { ok } from 'svas'
  import { goto, replaceState } from '$app/navigation'
  import * as Picker from '$com/picker'
  import TextEllipsis from '$com/text-ellipsis/TextEllipsis.svelte'
  import { adventures } from '@/adventures'
  import { Avatars } from '@/app/ui'
  import { url } from '@/media/ui/Picture'
  import { dict } from './intl'
  import type { Props } from './Selector'

  const { id, draft, onchange }: Props = $props()

  const active = $derived((ok($adventures) ? $adventures : []).filter((a) => !a.archived))

  // svelte-ignore state_referenced_locally
  let picked = $state(id ? active.findIndex((a) => a.id === id) + 1 : 0)

  function onpick(index: number) {
    if (index === picked) return

    const state = { expense: { ...draft, attachments: [...draft.attachments] } }

    if (index === 0) return goto('/expenses/editor/', { replaceState: true, state })

    const path = `/adventures/${active[index - 1].id}/expenses/editor/`

    if (picked > 0) {
      replaceState(path, state)
      picked = index
      onchange?.(active[index - 1].id)
    } else goto(path, { replaceState: true, state })
  }

  const card = 'w-40 shrink-0 overflow-hidden rounded-lg'
</script>

{#if active.length > 0}
  <Picker.Root {picked} scroll={picked} {onpick} snap="start" class="gap-2 px-5 py-1 scroll-px-5">
    <Picker.Option
      variant="outline"
      class={[card, 'flex-col gap-1.5 items-center justify-center text-muted-foreground']}>
      <Pencil />
      <span class="text-sm">{$dict.selector.regular}</span>
    </Picker.Option>

    {#each active as adv (adv.id)}
      <Picker.Option
        class={[
          card,
          'cover relative isolate bg-cover bg-center flex-col items-start justify-end px-4 py-3',
        ]}
        style="background-image: url({url({
          id: adv.picture,
          path: '/pictures/',
          variant: '600x400!',
        })})">
        <div class="relative z-10 flex flex-col items-start gap-1 w-full">
          <TextEllipsis>{adv.title}</TextEllipsis>
          <Avatars identities={Object.keys(adv.participants)} max={4} />
        </div>
      </Picker.Option>
    {/each}
  </Picker.Root>
{/if}

<style>
  :global(.cover)::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgb(0 0 0 / 55%);
    backdrop-filter: blur(0.5px);
  }
</style>
```

---

### Task 3: Adventure Expense Editor Route

**Files:**

- Create: `src/routes/(private)/adventures/[id=id]/expenses/editor/[[eid=id]]/+page.svelte`

Page renders:
1. Adventure header with title + paperclip attach button
2. `Selector` (with current adventure `id`, form draft, `onchange` to swap adventure in-place)
3. `Attachments` (read from form draft)
4. `ExpenseForm.Form` — keyed by `eid` (existing) or `id` (new) for proper reset

Attachment upload uses `@/expenses.attach(files)` → `form.attach(...ids)`.

For existing expense (`eid` param): looks up expense from adventure, passes to form.
For new expense: passes `page.state.expense ?? {}` (preserved from Selector navigation).

```svelte
<script lang="ts">
  import { Paperclip } from '@lucide/svelte'
  import { Async } from 'svas'
  import { page } from '$app/state'
  import { Spinner } from '$ui/spinner'
  import { adventures } from '@/adventures'
  import { Selector } from '@/adventures/ui'
  import { ExpenseForm } from '@/adventures/ui'
  import { Header, Section } from '@/app/ui'
  import { attach } from '@/expenses'
  import { Attachments } from '@/expenses/ui'

  let id = $state(page.params.id as string)
  const eid = $derived(page.params.eid)

  let form = $state<ReturnType<typeof ExpenseForm.Form>>()

  let input = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)

  async function upload(e: Event) {
    const target = e.target as HTMLInputElement

    if (target.files === null) return

    const files = Array.from(target.files)

    target.value = ''
    uploading = true

    const ids = await attach(files)

    uploading = false

    if (ids instanceof Error) return

    form?.attach(...ids)
  }
</script>

<Async store={adventures}>
  {#snippet awaited(adventures)}
    {@const adventure = adventures.find((a) => a.id === id)}
    {@const existing = eid ? adventure?.expenses.find((e) => e.id === eid) : undefined}
    {#if adventure}
      <Section>
        <Header.Root>
          <Header.Title>{adventure.title}</Header.Title>
          <Header.Actions>
            <Header.Button id="adventures-expense-attach-button" onclick={() => input?.click()}>
              {#if uploading}
                <Spinner />
              {:else}
                <Paperclip />
              {/if}
            </Header.Button>
          </Header.Actions>
          <input
            type="file"
            accept="image/*"
            bind:this={input}
            onchange={upload}
            multiple
            class="hidden" />
        </Header.Root>
      </Section>

      <Selector
        {id}
        draft={form?.draft() ?? { title: '', attachments: [] }}
        onchange={(v) => {
          id = v
        }} />

      <Attachments attachments={form?.draft()?.attachments ?? []} />

      {#if existing}
        {#key eid}
          <ExpenseForm.Form bind:this={form} {adventure} expense={existing} />
        {/key}
      {:else}
        {#key id}
          <ExpenseForm.Form bind:this={form} {adventure} expense={page.state.expense ?? {}} />
        {/key}
      {/if}
    {/if}
  {/snippet}
</Async>
```

---

### Task 4: Regular Editor Selector Integration

**Files:**

- Modify: `src/@/expenses/ui/Editor/Edit.svelte`

Add `Selector` import from `@/adventures/ui`. Render above `Attachments`, passing current draft fields (`title`, `location`, `attachments`). No `id` prop (regular editor = no adventure selected). No form/context changes to existing expense editor — Selector handles navigation away.

```svelte
<Selector
  draft={{
    title: ctx.value.title,
    location: ctx.value.location,
    attachments: [...ctx.value.attachments],
  }} />

<Attachments bind:attachments={value.attachments} />
<Form bind:value bind:mode {onsubmit} />
```

---

### Task 5: Adventure Expense Details

**Files:**

- Create: `src/@/adventures/ui/expenses/details/Description.svelte`
- Create: `src/@/adventures/ui/expenses/details/Description.ts`
- Create: `src/@/adventures/ui/expenses/details/Totals.svelte`
- Create: `src/@/adventures/ui/expenses/details/Totals.ts`
- Create: `src/@/adventures/ui/expenses/details/index.ts`

Read-only components for expense view page.

**Description.ts** + **Totals.ts** props:

```typescript
import type { Expense } from '@/adventures'

export interface Props {
  expense: Expense
}
```

**Description.svelte** — title (2xl bold), date + location (muted):

```svelte
<script lang="ts">
  import { locale } from '$lib/intl'
  import { date } from '$lib/tools'
  import type { Props } from './Description'

  const { expense }: Props = $props()
</script>

<div class="space-y-2">
  <div id="adventures-details-title" class="text-2xl font-bold">{expense.title ?? ''}</div>
  <div class="text-muted-foreground">
    {date(expense.date, $locale)}{#if expense.location}, {expense.location}{/if}
  </div>
</div>
```

**Totals.svelte** — 2-column card grid: total amount (Coins, neutral sign) | payer avatar+name:

```svelte
<script lang="ts">
  import { Async } from 'svas'
  import { TextEllipsis } from '$com/text-ellipsis'
  import * as Card from '$ui/card'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Coins } from '@/app/ui'
  import { account as me } from '@/iam'
  import { dict } from '../../intl'
  import type { Props } from './Totals'

  const { expense }: Props = $props()
</script>

<div class="grid grid-cols-2 gap-2">
  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.expenses.total}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Coins
        id="adventures-details-total"
        amount={expense.amount}
        sign="neutral"
        class="text-3xl" />
    </Card.Content>
  </Card.Root>

  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.expenses.paidBy}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Async store={accounts.get(expense.payer)}>
        {#snippet awaited(account)}
          {@const name = expense.payer === $me?.id ? $dict.me : account.name}
          <div class="flex items-center gap-2">
            <Picture {account} class="size-8" />
            <TextEllipsis>{name}</TextEllipsis>
          </div>
        {/snippet}
      </Async>
    </Card.Content>
  </Card.Root>
</div>
```

---

### Task 6: Adventure Expense View Route

**Files:**

- Create: `src/routes/(private)/adventures/[id=id]/expenses/[eid=id]/+page.svelte`

Page layout:
1. Adventure header with title
2. `Attachments` (read-only, `editable={false}`)
3. `ExpenseDetails.Description` — expense title, date, location
4. `ExpenseDetails.Totals` — amount + payer card grid
5. Actions panel with pencil edit button → `/adventures/{id}/expenses/editor/{eid}/`

```svelte
<script lang="ts">
  import { Pencil } from '@lucide/svelte'
  import { Async } from 'svas'
  import { page } from '$app/state'
  import { Actions } from '$com/shell'
  import { adventures } from '@/adventures'
  import { ExpenseDetails } from '@/adventures/ui'
  import { Action, Header, Section } from '@/app/ui'
  import { Attachments } from '@/expenses/ui'

  const id = $derived(page.params.id) as string
  const eid = $derived(page.params.eid) as string
</script>

<Async store={adventures}>
  {#snippet awaited(adventures)}
    {@const adventure = adventures.find((a) => a.id === id)}
    {@const expense = adventure?.expenses.find((e) => e.id === eid)}

    {#if adventure && expense}
      <Section>
        <Header.Root>
          <Header.Title>{adventure.title}</Header.Title>
        </Header.Root>
      </Section>

      <Attachments attachments={expense.attachments} editable={false} />

      <Section>
        <ExpenseDetails.Description {expense} />
      </Section>

      <Section>
        <ExpenseDetails.Totals {expense} />
      </Section>

      <Actions>
        <Action
          id="adventures-expense-edit-action"
          href={`/adventures/${id}/expenses/editor/${eid}/`}>
          <Pencil />
        </Action>
      </Actions>
    {/if}
  {/snippet}
</Async>
```

---

### Task 7: Update Expense Card & UI Exports

**Files:**

- Modify: `src/@/adventures/ui/Expense.svelte` — card href points to view page `/adventures/{adventure}/expenses/{expense.id}` (not editor)
- Modify: `src/@/adventures/ui/index.ts` — add exports: `Selector`, `ExpenseForm`, `ExpenseDetails`

**i18n:**

```bash
npx intl add "adventures/selector.regular" "Regular spending" "label for non-adventure expense option"
npx intl add "adventures/expenses.total" "Total" "expense total label"
npx intl add "adventures/expenses.paidBy" "Paid by" "expense payer label"
```

---

**Verify:** `npm run check && npm run lint`

- [x] `npm run check`
- [x] `npm run lint`

---

### Acceptance (Agent UI Testing)

- [x] From adventure view, tap "+" → expense editor with adventure preselected in selector
- [x] Fill title + amount + select payer → save → expense appears in adventure
- [x] Tap expense card → expense view page with title, date, amount, payer
- [x] Tap edit pencil on view page → opens editor with expense data populated
- [x] Open regular expense editor with ≥1 active adventure → selector visible
- [x] Tap adventure in selector → navigates to adventure expense editor, draft fields preserved
- [x] Tap "Regular spending" in adventure editor → navigates back to regular editor, draft preserved
- [x] Switch between adventures in selector → form resets with new adventure context
- [x] No active adventures → selector hidden in both editors
- [x] Paperclip attachment upload works in adventure expense editor

---

**Commit:**

```
feat(adventures): add expense editor and view

Standalone adventure expense form (title, amount, payer).
Selector bridges regular/adventure editors preserving draft.
Expense view page with details and edit action.
```
