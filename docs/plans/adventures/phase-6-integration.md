# Phase 6: Integration

## [← Back to Plan](../2026-03-10-adventures-implementation.md)

### Task 1: Hint Compound Component

**Ref:** seed-svelte → components.md (Compound Components), stores.md (value store)

Generalized dismissable hint panel extracted from `Permission`. Compound sub-components: Root, Content, Dismissing, Actions, Action, Later, Dismiss. Context: `{ dismissing, later(), dismiss() }`. Supports two flows: two-step (Later → Dismissing → Dismiss) and direct (Dismiss inside Content). Persistent store: `Record<string, number | true>` — `number` for time-delayed re-show, `true` for permanent dismiss.

**Files:**

- Create: `src/@/app/ui/hint/store.ts`
- Create: `src/@/app/ui/hint/Context.ts`
- Create: `src/@/app/ui/hint/Root.ts`
- Create: `src/@/app/ui/hint/Root.svelte`
- Create: `src/@/app/ui/hint/Content.svelte`
- Create: `src/@/app/ui/hint/Dismissing.svelte`
- Create: `src/@/app/ui/hint/Actions.svelte`
- Create: `src/@/app/ui/hint/Action.ts`
- Create: `src/@/app/ui/hint/Action.svelte`
- Create: `src/@/app/ui/hint/Later.ts`
- Create: `src/@/app/ui/hint/Later.svelte`
- Create: `src/@/app/ui/hint/Dismiss.ts`
- Create: `src/@/app/ui/hint/Dismiss.svelte`
- Create: `src/@/app/ui/hint/index.ts`
- Modify: `src/@/app/ui/index.ts` — add `Hint` namespace export

**Step 1: store.ts**

```typescript
import { value } from 'svas'

export type Hints = Record<string, number | true>

export const hints = value<Hints>({
  persist: 'hints',
  default: {},
})
```

**Step 2: Context.ts**

```typescript
import { setContext as set, getContext as get } from 'svelte'

export interface Context {
  get dismissing(): boolean
  later: () => void
  dismiss: () => void
}

const KEY = Symbol('hint')
export const getContext = () => get<Context>(KEY)
export const setContext = (ctx: Context) => set(KEY, ctx)
```

**Step 3: Root.ts**

```typescript
import type { Snippet } from 'svelte'
import type { ClassValue } from 'svelte/elements'

export interface Props {
  key: string
  delay?: number
  name?: string
  class?: ClassValue
  children: Snippet
}
```

**Step 4: Root.svelte**

```svelte
<script lang="ts">
  import { transit } from '$lib/tools'
  import Panel from '../Panel.svelte'
  import { setContext } from './Context'
  import { hints } from './store'
  import type { Props } from './Root'

  const { key, delay, name, class: classes, children }: Props = $props()

  const entry = $derived($hints[key])
  const hidden = $derived(
    entry === true || (typeof entry === 'number' && delay != null && Date.now() - entry < delay),
  )

  let dismissing = $state(false)

  setContext({
    get dismissing() {
      return dismissing
    },
    later: () => transit(() => (dismissing = true)),
    dismiss: () => transit(() => hints.update((h) => ({ ...h, [key]: delay ? Date.now() : true }))),
  })
</script>

{#if !hidden}
  <Panel
    {name}
    class={[
      'w-full h-fit p-4 flex flex-col gap-3',
      'bg-muted border border-muted-foreground/20 rounded-lg',
      classes,
    ]}>
    {@render children()}
  </Panel>
{/if}
```

**Step 5: Content.svelte** — renders children when NOT dismissing:

```svelte
<script lang="ts">
  import { getContext } from './Context'
  import type { Snippet } from 'svelte'

  const { children }: { children: Snippet } = $props()
  const { dismissing } = getContext()
</script>

{#if !dismissing}
  {@render children()}
{/if}
```

**Step 6: Dismissing.svelte** — renders children when dismissing:

```svelte
<script lang="ts">
  import { getContext } from './Context'
  import type { Snippet } from 'svelte'

  const { children }: { children: Snippet } = $props()
  const { dismissing } = getContext()
</script>

{#if dismissing}
  {@render children()}
{/if}
```

**Step 7: Actions.svelte** — flex row for buttons:

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte'

  const { children }: { children: Snippet } = $props()
</script>

<div class="flex gap-2">
  {@render children()}
</div>
```

**Step 8a: Action.ts** — CTA button props, inherits ButtonProps:

```typescript
import type { Props as ButtonProps } from '$ui/button'

export type Props = ButtonProps
```

**Step 8b: Action.svelte**

```svelte
<script lang="ts">
  import { Button } from '$ui/button'
  import type { Props } from './Action'

  const { children, ...rest }: Props = $props()
</script>

<Button class="w-fit" {...rest}>
  {@render children?.()}
</Button>
```

**Step 9a: Later.ts**

```typescript
import type { Props as ButtonProps } from '$ui/button'

export type Props = Omit<ButtonProps, 'onclick'>
```

**Step 9b: Later.svelte** — ghost button triggering dismissing state:

```svelte
<script lang="ts">
  import { Button } from '$ui/button'
  import { getContext } from './Context'
  import type { Props } from './Later'

  const { children, ...rest }: Props = $props()
  const { later } = getContext()
</script>

<Button variant="ghost" onclick={later} {...rest}>
  {@render children?.()}
</Button>
```

**Step 10a: Dismiss.ts**

```typescript
import type { Props as ButtonProps } from '$ui/button'

export type Props = Omit<ButtonProps, 'onclick'>
```

**Step 10b: Dismiss.svelte** — button writing to store (final dismiss):

```svelte
<script lang="ts">
  import { Button } from '$ui/button'
  import { getContext } from './Context'
  import type { Props } from './Dismiss'

  const { children, ...rest }: Props = $props()
  const { dismiss } = getContext()
</script>

<Button class="w-fit" onclick={dismiss} {...rest}>
  {@render children?.()}
</Button>
```

**Step 11: index.ts**

```typescript
export { default as Root } from './Root.svelte'
export { default as Content } from './Content.svelte'
export { default as Dismissing } from './Dismissing.svelte'
export { default as Actions } from './Actions.svelte'
export { default as Action } from './Action.svelte'
export { default as Later } from './Later.svelte'
export { default as Dismiss } from './Dismiss.svelte'
```

**Step 12: @/app/ui/index.ts** — add:

```typescript
export * as Hint from './hint'
```

**Usage (two-step: Later → Dismissing):**

```svelte
<Hint.Root key="my-hint">
  <Hint.Content>
    <p>hint text</p>
    <Hint.Actions>
      <Hint.Action onclick={doSomething}>Subscribe</Hint.Action>
      <Hint.Later>Later</Hint.Later>
    </Hint.Actions>
  </Hint.Content>
  <Hint.Dismissing>
    <p>farewell text</p>
    <Hint.Dismiss>Dismiss</Hint.Dismiss>
  </Hint.Dismissing>
</Hint.Root>
```

**Usage (direct dismiss, no Dismissing step):**

```svelte
<Hint.Root key="my-hint">
  <Hint.Content>
    <p>hint text</p>
    <Hint.Dismiss>Got it</Hint.Dismiss>
  </Hint.Content>
</Hint.Root>
```

---

### Task 2: Refactor Permission → Hint

**Files:**

- Modify: `src/@/transmission/ui/Permission.svelte`
- Modify: `src/@/transmission/svc/store.ts` — remove `dismissed` store
- Modify: `src/@/transmission/svc/index.ts` — remove `dismissed` export if present

**Step 1: Permission.svelte** — rewrite using Hint compound:

```svelte
<script lang="ts">
  import { Hint } from '@/app/ui'
  import { permission, request } from '@/transmission'
  import { dict } from './intl'
  import type { Props } from './Permission'

  const { class: classes, name = 'transmission-permission', dismissable = false }: Props = $props()

  const DELAY = 7 * 24 * 60 * 60 * 1000

  function subscribe() {
    void request()
  }
</script>

{#if $permission === 'default'}
  <Hint.Root key="permission" delay={dismissable ? DELAY : undefined} {name} class={classes}>
    <Hint.Content>
      <p>{$dict.permission.prompt}</p>
      <p class="text-sm text-muted-foreground">{$dict.permission.comment}</p>
      <Hint.Actions>
        <Hint.Action onclick={subscribe}>{$dict.permission.button}</Hint.Action>
        {#if dismissable}
          <Hint.Later>{$dict.permission.later}</Hint.Later>
        {/if}
      </Hint.Actions>
    </Hint.Content>
    <Hint.Dismissing>
      <p>{$dict.permission.dismissed}</p>
      <Hint.Dismiss>{$dict.permission.dismiss}</Hint.Dismiss>
    </Hint.Dismissing>
  </Hint.Root>
{/if}
```

**Step 2: store.ts** — remove `dismissed`:

```diff
- export const dismissed = value<number>({
-   persist: 'transmission:dismissed',
-   default: 0,
- })
```

**Step 3:** Remove `dismissed` from `@/transmission` exports if present.

---

### Task 3: Adventures Hint Component

Shows on expenses page when user has no active adventures. First panel: info icon + info text + Start button + Dismiss. Second panel: guidance about [+] menu.

**Files:**

- Create: `src/@/adventures/ui/Hint.svelte`

**i18n:**

```bash
npx intl add "adventures/hint/action" "Start your first adventure"
npx intl add "adventures/hint/dismiss" "Dismiss"
npx intl add "adventures/hint/dismissed" "You can create a new adventure anytime through the + menu at the bottom of the screen."
```

> Reuse existing `$dict.editor.info` for the main prompt text.

**Hint.svelte:**

```svelte
<script lang="ts">
  import { Info } from '@lucide/svelte'
  import { Hint } from '@/app/ui'
  import { dict } from './intl'
</script>

<Hint.Root key="adventures">
  <Hint.Content>
    <div class="flex items-start gap-2">
      <Info class="size-5 shrink-0 text-muted-foreground mt-0.5" />
      <p class="text-sm">{$dict.editor.info}</p>
    </div>
    <Hint.Actions>
      <Hint.Action variant="outline" href="/adventures/editor/">
        {$dict.hint.action}
      </Hint.Action>
      <Hint.Later>{$dict.hint.dismiss}</Hint.Later>
    </Hint.Actions>
  </Hint.Content>
  <Hint.Dismissing>
    <p class="text-sm">{$dict.hint.dismissed}</p>
    <Hint.Dismiss>{$dict.hint.dismiss}</Hint.Dismiss>
  </Hint.Dismissing>
</Hint.Root>
```

---

### Task 4: Adventures Panel (Card)

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

  const members = $derived(Object.keys(adventure.participants).filter((id) => id !== $account?.id))
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
      {#if adventure.archived && adventure.archivedAt}
        <Archived at={adventure.archivedAt} />
      {:else}
        <Coins amount={balance} />
      {/if}
    </div>
  {/snippet}
</Panel>
```

> Verify `$com/Panel` passes `style:*` through `...props` to Button. If not, may need to adjust.

---

### Task 5: Adventures Section (Horizontal Scroll)

**Ref:** Follows `@/favorites/ui/Favorites.svelte` pattern — data via props, page handles fetching.

**Files:**

- Create: `src/@/adventures/ui/Adventures.svelte`
- Create: `src/@/adventures/ui/Adventures.ts`

**i18n:**

```bash
npx intl add "adventures/title" "Adventures"
```

**Step 1: Adventures.ts**

```typescript
import type { Adventure } from '@/adventures'

export interface Props {
  adventures: Adventure[]
  class?: string
}
```

**Step 2: Adventures.svelte**

Active adventures → Scrollable cards. No active → Hint (replaces Scrollable). Hint dismissed + no active → entire section hidden (title included). Title always shown when section is visible.

```svelte
<script lang="ts">
  import { Scrollable } from '$com/scrollable'
  import { hints } from '@/app/ui/hint/store'
  import { dict } from './intl'
  import Hint from './Hint.svelte'
  import Panel from './Panel.svelte'
  import type { Props } from './Adventures'

  const { adventures, class: classes }: Props = $props()

  const active = $derived(adventures.filter((a) => !a.archived))
  const archived = $derived(adventures.filter((a) => a.archived))
  const dismissed = $derived($hints['adventures'] === true)
  const visible = $derived(active.length > 0 || !dismissed)
</script>

{#if visible}
  <h2>{$dict.title}</h2>
  {#if active.length > 0}
    <Scrollable class={['gap-1.5 py-2 -my-2', classes]}>
      {#each active as adventure (adventure.id)}
        <Panel {adventure} />
      {/each}
      {#each archived as adventure (adventure.id)}
        <Panel {adventure} />
      {/each}
    </Scrollable>
  {:else}
    <Hint />
  {/if}
{/if}
```

---

### Task 6: Adventure Expense Shortcut in Dropdown

**Files:**

- Modify: `src/@/app/ui/Actions.ts`

Latest active adventure shortcut. First item in menu, inside `direction='col'` group. Regular button style. `actions` becomes a `derived` store subscribing to `dict` and `adventures`.

**Step 1:** Refactor `actions` to a derived store:

```typescript
import { derived } from 'svelte/store'
import { PencilLine, Plus, User, Users } from '@lucide/svelte'
import { goto } from '$app/navigation'
import { ok } from 'svas'
import { dict } from '$lib/intl'
import type { Dictionary } from '$lib/intl'
import type { Icon } from '@lucide/svelte'
import { adventures } from '@/adventures'
import type { Adventure } from '@/adventures'

// ... ActionItem, ActionGroup types unchanged ...

function addAdventureExpense(dict: Dictionary, adventure: Adventure): ActionItem {
  return {
    id: 'nav-actions-adventure-expense-button',
    name: `+ ${adventure.title}`,
    icon: PencilLine,
    onSelect: () => goto(`/adventures/${adventure.id}/expenses/editor/`),
  }
}

// ... addExpense, addContact, addContactGroup, addAdventure unchanged ...

function latest(adventures: Adventure[]): Adventure | undefined {
  const active = adventures.filter((a) => !a.archived)

  return active.length > 0 ? active.reduce((a, b) => (a._created > b._created ? a : b)) : undefined
}

export const actions = derived([dict, adventures], ([$dict, $adventures]) => {
  const adventure = latest(ok($adventures) ? $adventures : [])

  return [
    ...(adventure
      ? [
          {
            name: 'adventure',
            direction: 'col' as const,
            items: [addAdventureExpense($dict, adventure)],
          },
        ]
      : []),
    {
      name: $dict.actions.cheques.title,
      direction: 'col' as const,
      items: [addContactGroup($dict)],
    },
    {
      name: $dict.actions.contacts.title,
      direction: 'row' as const,
      items: [addContact($dict), addExpense($dict), addAdventure($dict)],
    },
  ] satisfies ActionGroup[]
})
```

**Step 2:** Update `Actions.svelte` — `$actions` is now a store subscription, no args:

```svelte
{#each $actions as group, index (group.name)}
```

Remove `actions($dict)` call, replace with `$actions`.

---

### Task 7: Adventures Section on Pages

**Files:**

- Modify: `src/routes/(private)/+page.svelte`
- Modify: `src/routes/(private)/expenses/+page.svelte`

**Step 1: Home page** — add `adventures` to `combined()`, render `<Adventures>`:

```svelte
import { adventures } from '@/adventures'
import Adventures from '@/adventures/ui/Adventures.svelte'
```

```svelte
<Async store={combined(account, contacts, expenses, notifications, adventures)}>
  {#snippet awaited([account, contacts, expenses, notifications, adventures])}
    ...
    <Section>
      <Adventures {adventures} />
    </Section>
```

Place `<Adventures>` section after Tops, before Recent.

**Step 2: Expenses page** — add adventures to async, render `<Adventures>` section. Hint logic is internal to Adventures component.

```svelte
<script lang="ts">
  import { Async, combined } from 'svas'
  // ... existing imports ...
  import { adventures } from '@/adventures'
  import { Adventures } from '@/adventures/ui'
</script>

<Async store={combined(expenses, adventures)}>
  {#snippet awaited([expenses, adventures])}
    <Section>
      <Adventures {adventures} />
    </Section>

    <!-- existing expenses list below -->
  {/snippet}
</Async>
```

---

### Task 8: Update UI Exports

**Files:**

- Modify: `src/@/adventures/ui/index.ts`

Add Hint, Panel, and Adventures exports:

```typescript
export { default as Hint } from './Hint.svelte'
export { default as Panel } from './Panel.svelte'
export { default as Adventures } from './Adventures.svelte'
```

---

**Verify:** `npm run check && npm run lint`

---

### Acceptance (Agent UI Testing)

Agent opens app in browser and verifies:

- [ ] Home page: "Adventures" section visible with horizontal scroll of adventure cards (cover bg + title + avatars + balance)
- [ ] Expenses page: active adventures → adventures section present
- [ ] Expenses page: no active adventures → hint panel with info icon, info text, "Start your first adventure" button, "Dismiss" button
- [ ] Hint dismiss → transitions to second panel with [+] menu guidance + "Dismiss" button
- [ ] Final hint dismiss → permanently hidden (survives page reload)
- [ ] Active adventures: normal opacity, tap → navigates to view
- [ ] Archived adventures: reduced opacity, appear after active in scroll
- [ ] No "Create Adventure" button in adventures section
- [ ] Main dropdown: first item is adventure expense shortcut with cover image background → tapping navigates to adventure expense editor
- [ ] Adventure shortcut not shown when no active adventures
- [ ] Permission hint on home page still works (7-day re-show)
- [ ] Permission on me page (non-dismissable) still works

---

**Commit:**

```
feat(adventures): integration

Hint compound component (dismissable panels with persistent store).
Refactor Permission to use Hint.
Adventures Hint on expenses page (no active adventures).
Panel card, Adventures section on home + expenses pages.
Adventure expense shortcut in nav dropdown.
```
