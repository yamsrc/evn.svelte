# Phase 6: Integration

[← Back to Plan](../2026-03-10-adventures-implementation.md)

---

### Task 1: Adventures Panel (Card)

**Ref:** seed-svelte → components.md (Compound Components)

Card for horizontal scroll section. Cover background + title.

**Files:**
- Create: `src/@/adventures/ui/Panel.svelte`
- Create: `src/@/adventures/ui/Panel.ts`

**Step 1: Panel.ts**

```typescript
import type { Adventure } from '@/adventures'

export interface Props {
  adventure: Adventure
  class?: string
}
```

**Step 2: Panel.svelte**

Card with cover background image. Layout top→bottom: title, avatars +N, bottom row (balance or "Archived {date}"). White text with drop-shadow over background.

```svelte
<script lang="ts">
  import { Panel } from '$com/panel'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { Avatars, Coins } from '@/app/ui'
  import Archived from './Archived.svelte'
  import { url } from '@/media/ui/Picture'
  import { account } from '@/iam'
  import type { Props } from './Panel'

  const { adventure, class: classes }: Props = $props()

  const members = $derived(adventure.identities.filter((id) => id !== $account?.id))
  const balance = $derived(adventure.participants[$account?.id ?? ''] ?? 0)

  const background = $derived(
    adventure.picture
      ? `url(${url({ id: adventure.picture, path: '/pictures/', variant: '600x400!' })})`
      : undefined,
  )
</script>

<Panel
  class={[
    'w-44 shrink-0 flex-col gap-0 bg-cover bg-center',
    adventure.archived && 'opacity-70',
    classes,
  ]}
  style:background-image={background}
  href={`/adventures/${adventure.id}/`}>
  {#snippet left()}
    <div class="flex flex-col items-start gap-1.5">
      <TextEllipsis class="font-bold">{adventure.title}</TextEllipsis>
      <Avatars identities={members} />
      {#if adventure.archived && adventure.at}
        <Archived at={adventure.at} />
      {:else}
        <Coins amount={balance} />
      {/if}
    </div>
  {/snippet}
</Panel>
```

> Verify `$com/Panel` passes `style:*` through `...props` to Button. If not, may need to adjust.

---

### Task 2: Adventures Section (Horizontal Scroll)

**Ref:** Follows `@/favorites/ui/Favorites.svelte` pattern — data via props, page handles fetching.

**Files:**
- Create: `src/@/adventures/ui/Adventures.svelte`
- Create: `src/@/adventures/ui/Adventures.ts`

**i18n:**

```bash
npx intl add "adventures/title" "Adventures"
npx intl add "adventures/create" "Create Adventure"
```

**Step 1: Adventures.ts**

```typescript
import type { Adventure } from '@/adventures'

export interface Props {
  adventures: Adventure[]
  creatable?: boolean
  class?: string
}
```

**Step 2: Adventures.svelte**

Horizontal scroll: `[Active...] [Archived...]`. Optional "Create adventure" button below.

```svelte
<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { Scrollable } from '$com/scrollable'
  import { dict } from './intl'
  import Panel from './Panel.svelte'
  import type { Props } from './Adventures'

  const { adventures, creatable, class: classes }: Props = $props()

  const active = $derived(adventures.filter((a) => !a.archived))
  const archived = $derived(adventures.filter((a) => a.archived))
</script>

{#if adventures.length > 0}
  <h2>{$dict.title}</h2>
  <Scrollable class={['gap-1.5 py-2 -my-2', classes]}>
    {#each active as adventure (adventure.id)}
      <Panel {adventure} />
    {/each}
    {#each archived as adventure (adventure.id)}
      <Panel {adventure} />
    {/each}
  </Scrollable>
  {#if creatable}
    <Button href="/adventures/editor/">
      <Plus />{$dict.create}
    </Button>
  {/if}
{/if}
```

---

### Task 3: Adventures Section on Pages

**Files:**
- Modify: `src/routes/(private)/+page.svelte`
- Modify: `src/routes/(private)/expenses/+page.svelte`

Pages fetch `adventures` store and pass data as props (same pattern as Contacts, Groups, etc).

**Step 1: Home page** — add `adventures` to `combined()`, pass to `<Adventures>`:

```svelte
import { adventures } from '@/adventures'
import { Adventures } from '@/adventures/ui'
```
```svelte
<Async store={combined(account, contacts, expenses, notifications, adventures)}>
  {#snippet awaited([account, contacts, expenses, notifications, adventures])}
    ...
    <Adventures {adventures} />
```

**Step 2: Expenses page** — same pattern, add `adventures` to store fetching, pass as prop.

---

### Task 4: Main Dropdown Adventure Shortcut

**Files:**
- Modify: `src/@/app/ui/Actions.ts`

Add "Add expense to {adventure}" item for the most recent active adventure.

```typescript
function addAdventureExpense(dict: Dictionary, adventure: Adventure): ActionItem {
  return {
    id: 'nav-actions-adventure-expense-button',
    name: `+ ${adventure.title}`,
    icon: PencilLine,
    onSelect: () => goto(`/adventures/${adventure.id}/expenses/editor/`),
  }
}
```

---

### Task 5: Update UI Exports

**Files:**
- Modify: `src/@/adventures/ui/index.ts`

```typescript
export { default as Members } from './Members.svelte'
export { default as Cover } from './Cover.svelte'
export { default as Archive } from './Archive.svelte'
export { default as Archived } from './Archived.svelte'
export { default as Totals } from './Totals.svelte'
export { default as Expense } from './Expense.svelte'
export { default as Expenses } from './Expenses.svelte'
export { default as Selector } from './Selector.svelte'
export { default as Panel } from './Panel.svelte'
export { default as Adventures } from './Adventures.svelte'
export * as Editor from './Editor'
export * as ExpenseForm from './expenses/form'
export * as ExpenseDetails from './expenses/details'
```

---

**Verify:** `npm run check && npm run lint`

---

### Acceptance (Agent UI Testing)

Agent opens app in browser and verifies:

- [ ] Home page: "Adventures" section visible with horizontal scroll of adventure cards (cover bg + title + avatars + balance)
- [ ] Expenses page: same adventures section present
- [ ] Active adventures: normal opacity, tap → navigates to view
- [ ] Archived adventures: reduced opacity, appear after active in scroll
- [ ] "Create Adventure" button visible below section → navigates to editor
- [ ] Main dropdown: "+ {adventure title}" shortcut for most recent active adventure → opens expense editor with adventure preselected
- [ ] No adventures → section not rendered on home/expenses pages

---

**Commit:**

```
feat: adventures integration

Avatars extraction, Panel card, Adventures section.
Section on home + expenses pages, shortcut in main dropdown.
```
