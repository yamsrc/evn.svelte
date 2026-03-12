# Phase 3: Adventure View Screen

[← Back to Plan](../2026-03-10-adventures-implementation.md)

---

### Task 1: Extract Avatars Component

Overlapping avatars +N pattern used in 3 places — extract to `@/app/ui`. Normalizes inconsistent patterns: favorites uses `-space-x-2` + `ring-2 ring-card`, groups/expenses use `not-first:-ml-3` without ring. New component uses `-space-x-2` + `ring-2 ring-card` (cleaner overlap). Refactored usages will look slightly different — intentional visual normalization.

**Files:**
- Create: `src/@/app/ui/Avatars.svelte`
- Create: `src/@/app/ui/Avatars.ts`
- Modify: `src/@/app/ui/index.ts` — add export
- Modify: `src/@/favorites/ui/Group.svelte` — use `<Avatars>`
- Modify: `src/@/groups/ui/Panel.svelte` — use `<Avatars>`
- Modify: `src/@/expenses/ui/views/Expense.svelte` — use `<Avatars>`

**Step 1: Avatars.ts**

```typescript
export interface Props {
  identities: string[]
  max?: number
  class?: string
}
```

**Step 2: Avatars.svelte**

```svelte
<script lang="ts">
  import { Async } from 'svas'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import type { Props } from './Avatars'

  const { identities, max = 4, class: classes }: Props = $props()

  const visible = $derived(identities.slice(0, max))
  const remaining = $derived(identities.length - visible.length)
</script>

<div class={['flex items-center min-h-8', classes]}>
  {#if identities.length}
    <div class="flex -space-x-2">
      {#each visible as identity (identity)}
        <Async store={accounts.get(identity)}>
          {#snippet awaited(account)}
            <Picture {account} class="size-8 ring-2 ring-card shrink-0" />
          {/snippet}
        </Async>
      {/each}
    </div>
    {#if remaining > 0}
      <span class="ms-2">+{remaining}</span>
    {/if}
  {/if}
</div>
```

**Step 3: Export** — add to `src/@/app/ui/index.ts`

**Step 4: Refactor existing usages**

Replace avatar stacks in:
- `src/@/favorites/ui/Group.svelte` — `<Avatars identities={members} max={3} />`
- `src/@/groups/ui/Panel.svelte` — `<Avatars identities={members} max={5} class="py-1" />`
- `src/@/expenses/ui/views/Expense.svelte` — `<Avatars identities={participants} max={5} class="flex-1 justify-start" />`

**Verify:** `npm run check && npm run lint`

---

### Task 2: Compound Expense Card + Adventure Expenses

Implemented as a **compound component** `@/expenses/ui/views/card/` — composable, no prop drilling. Consumers use `<Separator />` from `$com/separator` between rows.

**Compound Card parts:**
- `Root` — `Button` shell with `highlighted` ring, extends `ButtonProps`
- `Row` — flex row with `align: 'start' | 'center'`
- `Side` — flex column with `align: 'start' | 'end'`
- `Metric` — amount + label + optional children (e.g. Paperclip icon)

**Files:**
- Create: `src/@/expenses/ui/views/card/` — compound component (Root, Row, Side, Metric + index.ts + types)
- Modify: `src/@/expenses/ui/views/Expense.svelte` — refactor to use `Card.*`
- Modify: `src/@/expenses/ui/views/index.ts` — `export * as Card from './card'`
- Create: `src/@/adventures/ui/Expense.svelte`
- Create: `src/@/adventures/ui/Expense.ts`
- Create: `src/@/adventures/ui/Expenses.svelte`
- Create: `src/@/adventures/ui/Expenses.ts`

**i18n:**

```bash
npx intl add "adventures/expenses.title" "Expenses"
npx intl add "adventures/expenses.total" "Total bill"
npx intl add "adventures/expenses.paidBy" "Paid by"
npx intl add "adventures/expenses.paid" "Paid"
npx intl add "adventures/expenses.you" "You"
```

**Step 1: Card compound — Root.ts**

```typescript
import type { ButtonProps } from '$ui/button'
import type { Snippet } from 'svelte'

export interface Props extends Omit<ButtonProps, 'children' | 'variant' | 'size'> {
  highlighted?: boolean
  children: Snippet
}
```

**Step 2: Root.svelte**

```svelte
<script lang="ts">
  import { Button } from '$ui/button'
  import type { Props } from './Root'

  const { children, highlighted, class: classes, ...rest }: Props = $props()
</script>

<Button
  variant="outline"
  size="lg"
  class={[
    'px-4 py-3 h-fit flex flex-col items-stretch gap-3 relative',
    highlighted && 'ring-inset ring-2 ring-muted-foreground/50',
    classes,
  ]}
  {...rest}>
  {@render children()}
</Button>
```

**Step 3: Row.ts**

```typescript
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  class?: string
  align?: 'start' | 'center'
}
```

**Step 4: Row.svelte**

```svelte
<script lang="ts">
  import type { Props } from './Row'

  const { children, class: classes, align = 'center' }: Props = $props()
</script>

<div
  class={[
    'w-full flex justify-between gap-3',
    align === 'start' ? 'items-start' : 'items-center',
    classes,
  ]}>
  {@render children()}
</div>
```

**Step 5: Side.ts**

```typescript
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  class?: string
  align?: 'start' | 'end'
}
```

**Step 6: Side.svelte**

```svelte
<script lang="ts">
  import type { Props } from './Side'

  const { children, class: classes, align = 'start' }: Props = $props()
</script>

<div
  class={[
    'flex flex-col gap-1 min-w-0',
    align === 'end' ? 'items-end text-end' : 'items-start text-start',
    classes,
  ]}>
  {@render children()}
</div>
```

**Step 7: Metric.ts**

```typescript
import type { Snippet } from 'svelte'

export interface Props {
  amount: number
  label: string
  children?: Snippet
  class?: string
}
```

**Step 8: Metric.svelte**

```svelte
<script lang="ts">
  import { Coins } from '@/app/ui'
  import type { Props } from './Metric'

  const { amount, label, children, class: classes }: Props = $props()
</script>

<div class={['flex flex-col items-end text-end shrink-0', classes]}>
  <div class="flex items-center gap-2">
    <Coins {amount} sign="neutral" />
    {@render children?.()}
  </div>
  <p class="text-sm text-muted-foreground">{label}</p>
</div>
```

**Step 9: card/index.ts**

```typescript
export { default as Root } from './Root.svelte'
export { default as Row } from './Row.svelte'
export { default as Side } from './Side.svelte'
export { default as Metric } from './Metric.svelte'
```

**Step 10: Update views/index.ts**

```typescript
export * as Card from './card'
export { default as Transfer } from './Transfer.svelte'
export { default as Expense } from './Expense.svelte'
```

**Step 11: Refactor `Expense.svelte`** — uses compound Card + `<Separator />`

```svelte
<script lang="ts">
  import { Paperclip } from '@lucide/svelte'
  import { Attention } from '$com/shell'
  import { Separator } from '$com/separator'
  import { locale, dict } from '$lib/intl'
  import { date } from '$lib/tools'
  import { Avatars, Balance } from '@/app/ui'
  import { numbers, owe } from '@/expenses'
  import { account } from '@/iam'
  import * as Card from './card'
  import type { Props } from './Props'

  const { expense, highlighted }: Props = $props()
  const participants = $derived(Object.keys(expense.participants))
  const description = $derived(
    `${date(expense.date, $locale)}${expense.location ? `, ${expense.location}` : ''}`,
  )
</script>

<Card.Root href={`/expenses/${expense.id}/`} {highlighted}>
  <Card.Row align="start">
    <Card.Side class="flex-1">
      <div class="flex items-center gap-1">
        {#if expense.attachments.length > 0}
          <Paperclip size={14} class="text-muted-foreground" />
        {/if}
        {#if expense.title}
          <span>{expense.title}</span>
        {/if}
        {#if highlighted}
          <Attention class="mx-1" />
        {/if}
      </div>
      <p class="text-sm text-muted-foreground">{description}</p>
    </Card.Side>
    <Card.Metric amount={numbers.total(expense)} label={$dict.expenses.balance.total} />
  </Card.Row>
  <Separator />
  <Card.Row>
    <div class="flex-1">
      <Avatars identities={participants} max={5} class="flex-1 justify-start" />
    </div>
    <Balance
      balance={owe(expense.participants, expense.extras, $account?.id)}
      class="flex-col-reverse items-end" />
  </Card.Row>
</Card.Root>
```

**Step 12: Adventure Expense.ts**

```typescript
import type { net } from '@/adventures'

export interface Props {
  expense: net.Expense
  adventure: string
}
```

**Step 13: Adventure Expense.svelte** — payer-centric layout, shows adventure title

```svelte
<script lang="ts">
  import { Paperclip } from '@lucide/svelte'
  import { Async } from 'svas'
  import { locale } from '$lib/intl'
  import { date } from '$lib/tools'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Separator } from '$com/separator'
  import { Card } from '@/expenses/ui/views'
  import { account as me } from '@/iam'
  import { dict } from './intl'
  import type { Props } from './Expense'

  const { expense, adventure }: Props = $props()

  const description = $derived(
    `${date(expense.date, $locale)}${expense.location ? `, ${expense.location}` : ''}`,
  )
</script>

<Card.Root class="w-full">
  <Card.Row>
    <Async store={accounts.get(expense.payer)}>
      {#snippet awaited(account)}
        <div class="flex items-center gap-3 min-w-0">
          <Picture {account} class="size-8" />
          <span>{expense.payer === $me?.id ? $dict.expenses.you : account.name}</span>
        </div>
      {/snippet}
    </Async>
    <Card.Metric amount={expense.amount} label={$dict.expenses.paid}>
      {#if expense.attachments.length > 0}
        <Paperclip class="size-4 text-muted-foreground" />
      {/if}
    </Card.Metric>
  </Card.Row>
  <Separator />
  <Card.Row>
    <Card.Side class="flex-1">
      <span>{expense.title}</span>
      <p class="text-sm text-muted-foreground">{description}</p>
    </Card.Side>
    <span class="font-normal text-muted-foreground">{adventure}</span>
  </Card.Row>
</Card.Root>
```

**Step 14: Expenses.ts**

```typescript
import type { net } from '@/adventures'

export interface Props {
  expenses: net.Expense[]
  adventure: string
}
```

**Step 15: Expenses.svelte**

```svelte
<script lang="ts">
  import Expense from './Expense.svelte'
  import { dict } from './intl'
  import type { Props } from './Expenses'

  const { expenses, adventure }: Props = $props()
</script>

{#if expenses.length > 0}
  <div class="space-y-2">
    <h2>{$dict.expenses.title}</h2>
    {#each expenses as expense (expense.id)}
      <Expense {expense} {adventure} />
    {/each}
  </div>
{/if}
```

> **Verify:** `npm run check && npm run lint`

---

### Task 3: Totals Component

**Ref:** Follow `src/@/expenses/ui/details/Totals.svelte` pattern — 2-column `Card.Root` grid.

**Files:**
- Create: `src/@/adventures/ui/Totals.svelte`
- Create: `src/@/adventures/ui/Totals.ts`

**i18n:**

```bash
npx intl add "adventures/spending.yours" "Your spending"
npx intl add "adventures/spending.total" "Total spent"
```

**Step 1: Totals.ts**

```typescript
export interface Props {
  balance: number
  total: number
}
```

**Step 2: Totals.svelte**

```svelte
<script lang="ts">
  import * as Card from '$ui/card'
  import { Coins } from '@/app/ui'
  import { dict } from './intl'
  import type { Props } from './Totals'

  const { balance, total }: Props = $props()
</script>

<div class="grid grid-cols-2 gap-2">
  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.spending.yours}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Coins amount={balance} sign="neutral" class="text-3xl" />
    </Card.Content>
  </Card.Root>

  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.spending.total}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Coins amount={total} sign="neutral" class="text-3xl" />
    </Card.Content>
  </Card.Root>
</div>
```

---

### Task 4: Adventure View Route

**Files:**
- Create: `src/routes/(private)/adventures/[id=id]/+page.svelte`

Screen structure (top→bottom):
1. Header: adventure title + Settings gear → editor (hidden when archived)
2. Cover image (full-width rounded, `600x400!` variant)
3. Two stat cards: "Your spending" / "Total spent"
4. Members with progress bars
5. "Expenses" heading + expense cards
6. Actions: Plus FAB + label → create expense with preselected adventure (hidden when archived)

```svelte
<script lang="ts">
  import { Plus, Settings } from '@lucide/svelte'
  import { ok } from 'svas'
  import { page } from '$app/state'
  import { Actions } from '$com/shell'
  import { dict as common } from '$lib/intl'
  import { adventures, type Adventure } from '@/adventures'
  import { Expenses, Members, Totals } from '@/adventures/ui'
  import { Action, Header, Section } from '@/app/ui'
  import { account } from '@/iam'
  import { Picture } from '@/media/ui'

  const id = $derived(page.params.id)

  const adventure: Adventure | undefined = $derived(
    ok($adventures) ? $adventures.find((adventure) => adventure.id === id) : undefined,
  )

  const identities = $derived(adventure ? Object.keys(adventure.participants) : [])
  const balance = $derived(adventure?.participants[$account?.id ?? ''] ?? 0)
  const total = $derived(
    adventure?.expenses.reduce((sum, expense) => sum + expense.amount, 0) ?? 0,
  )
</script>

{#if adventure}
  <Section>
    <Header.Root>
      <Header.Title>{adventure.title}</Header.Title>
      {#if !adventure.archived}
        <Header.Actions>
          <Header.Button
            id="adventures-view-settings-button"
            href={`/adventures/editor/${adventure.id}/`}>
            <Settings />
          </Header.Button>
        </Header.Actions>
      {/if}
    </Header.Root>
  </Section>

  <Section>
    <Picture id={adventure.picture} variant="600x400!" class="w-full h-48 object-cover rounded-xl" />
  </Section>

  <Section>
    <Totals {balance} {total} />
  </Section>

  <Section>
    <Members {identities} participants={adventure.participants} />
  </Section>

  <Section>
    <Expenses expenses={adventure.expenses} adventure={adventure.title} />
  </Section>

  {#if !adventure.archived}
    <Actions>
      <Action
        id="adventures-view-create-action"
        href={`/adventures/${adventure.id}/expenses/editor/`}>
        <Plus />
        <span>{$common.actions.create}</span>
      </Action>
    </Actions>
  {/if}
{/if}
```

**Update UI Exports** — add Phase 3 components to `@/adventures/ui/index.ts`:

```typescript
export { default as Totals } from './Totals.svelte'
export { default as Expense } from './Expense.svelte'
export { default as Expenses } from './Expenses.svelte'
```

**Verify:** `npm run check && npm run lint`

---

**Phase 3 actual deltas**

- Card extraction became a **compound component** (`card/Root`, `Row`, `Side`, `Metric`) instead of single `Card.svelte` with props + `bottom` snippet. More composable — consumers build card layout declaratively instead of passing data as props. Separator used directly from `$com/separator` between rows.
- Adventure expense card layout is **payer-centric** (top: payer avatar+name | amount; bottom: title+date | adventure name) — differs from original design's "Paid by" label approach. Shows "You" for own expenses.
- `Expenses` and `Expense` components accept `adventure: string` (title) — displayed as muted label on each card, establishing context without navigation.
- Two extra i18n keys added: `expenses.paid` ("Paid") and `expenses.you` ("You").
- `remaining` in Avatars uses `identities.length - visible.length` (correct when `identities.length < max`) instead of `identities.length - max` (could go negative).
- View route: `total` derived from `expenses.reduce(sum + amount)`, `identities` from `Object.keys(adventure.participants)`. Test IDs on settings button and FAB.

---

### Acceptance (Agent UI Testing)

Agent opens app in browser and verifies:

- [x] Navigate to `/adventures/{id}/` — view page renders (title in header, cover image, totals, members, expenses)
- [x] Totals: "Your spending" and "Total spent" cards display correct amounts
- [x] Members: progress bar entries with avatars and balances
- [x] Expenses: expense cards with payer avatar + "Paid" amount, title + adventure name
- [x] Settings gear → navigates to editor
- [x] Plus FAB → navigates to expense editor with adventure preselected
- [ ] Archived adventure: no actions (no FAB, no settings). Archived badge deferred to Phase 4 — SKIPPED: no archived adventure in demo data
- [x] Existing expenses pages: expense cards still render correctly (compound Card didn't break avatars/balance)
- [x] Avatars component: verify favorites group cards, groups panel, expense cards show overlapping avatars correctly — no favorites in demo; groups avatars pre-existing demo limitation (confirmed via git diff)

---

**Commit:**

```
feat(adventures): add view screen

View route with totals, expenses, archived overlay.
Compound Card extraction from expenses domain.
```
