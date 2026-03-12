# Phase 8: Notifications

[← Back to Plan](../2026-03-10-adventures-implementation.md)

---

Backend emits two adventure notification events:

- **`adventures.joined`** — when identities added to adventure. Payload: `{ title: string, identities: string[] }`, data: `{ names: string[] }`
- **`adventures.expense`** — when expense added. Payload: `{ title: string, expense: { id: string, title: string, location?: string, date: string, amount: number, payer: string, attachments: string[] } }`

Push action routes: `/adventures/{id}/` (joined), `/adventures/{id}/expenses/{eid}/` (expense).

---

### Task 1: Add `adventures` to Transmission Scope Types

**Files:**

- Modify: `src/@/transmission/svc/Scope.ts` — add `'adventures'` domain + events

**Step 1: Extend Domain and EventMap**

```typescript
export type Domain = 'accounts' | 'contacts' | 'groups' | 'expenses' | 'adventures'

export type EventMap = {
  accounts: 'created'
  contacts: 'connected' | 'transferred' | 'unchained'
  groups: 'joined'
  expenses: 'created'
  adventures: 'joined' | 'expense'
}
```

**Verify:** `npm run check && npm run lint`

---

### Task 2: Add Adventure Notification Payloads

**Files:**

- Modify: `src/@/notifications/svc/net/Notification.ts` — add `adventures` payloads

**Step 1: Add adventures payloads to Constrain type**

```typescript
adventures: {
  joined: {
    title: string
    identities: string[]
  }
  expense: {
    title: string
    expense: {
      id: string
      title: string
      location?: string
      date: string
      amount: number
      payer: string
      attachments: string[]
    }
  }
}
```

Add after `groups` block in `Payloads`.

**Verify:** `npm run check && npm run lint` — `Constrain` will catch mismatches with `Domain`/`EventMap`.

---

### Task 3: Adventure Notification Components — Joined

**Files:**

- Create: `src/@/notifications/ui/components/adventures/Joined.ts`
- Create: `src/@/notifications/ui/components/adventures/Joined.svelte`

**Step 1: Props type**

```typescript
// Joined.ts
import type { Of } from '@/notifications'

export type Props = { notification: Of<'adventures', 'joined'> }
```

**Step 2: Joined component**

Pattern: follow `groups/Joined.svelte`. Load adventure from store, resolve newbie accounts, show avatar + message. Route to `/adventures/{key}/`.

```svelte
<!-- Joined.svelte -->
<script lang="ts">
  import { Async, combined } from 'svas'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { adventures } from '@/adventures'
  import { account } from '@/iam'
  import { dict } from '@/notifications/ui/intl'
  import Base from '../Base.svelte'
  import type { Props } from './Joined'
  import type { Account } from '@/accounts'
  import type { Adventure } from '@/adventures'

  const { notification }: Props = $props()

  const newbies = $derived(
    notification.payload.identities.map((identity) => accounts.get(identity)),
  )
</script>

<Async store={combined(adventures, account, ...newbies)}>
  {#snippet awaited([adventures, account, ...newbies]: [Adventure[], Account, ...Account[]])}
    {@const adventure = adventures.find((a) => a.id === notification.key)}
    {@const title = adventure?.title ?? notification.payload.title}
    {@const me = newbies.find(({ id }) => id === account.id)}
    <Base href={`/adventures/${notification.key}/`}>
      <div class="flex items-center gap-2">
        {#if me}
          {$dict.adventures.joined.me(title)}

        {:else if newbies.length === 1}
          {@const newbie = newbies[0]}
          <Picture account={newbie} size={32} />
          {$dict.adventures.joined.other(newbie.name, title, newbie.grammar)}
        {:else}
          {@const names = newbies.map((account) => account.name)}
          {$dict.adventures.joined.others(names, title)}
        {/if}
      </div>
    </Base>
  {/snippet}
</Async>
```

**Verify:** `npm run check && npm run lint`

---

### Task 4: Adventure Notification Components — Expense

**Files:**

- Create: `src/@/notifications/ui/components/adventures/Expense.ts`
- Create: `src/@/notifications/ui/components/adventures/Expense.svelte`

**Step 1: Props type**

```typescript
// Expense.ts
import type { Of } from '@/notifications'

export type Props = { notification: Of<'adventures', 'expense'> }
```

**Step 2: Expense component**

Show expense title + amount, route to `/adventures/{key}/expenses/{eid}/`.

```svelte
<!-- Expense.svelte -->
<script lang="ts">
  import { Async } from 'svas'
  import { currency } from '$lib/tools'
  import { accounts } from '@/accounts'
  import { dict, locale } from '@/notifications/ui/intl'
  import Base from '../Base.svelte'
  import type { Props } from './Expense'

  const { notification }: Props = $props()

  const { expense } = notification.payload
  const amount = $derived(currency(expense.amount, $locale))
</script>

<Async store={accounts.get(expense.payer)}>
  {#snippet awaited(payer)}
    <Base href={`/adventures/${notification.key}/expenses/${expense.id}/`}>
      <div>
        {$dict.adventures.expense.title(expense.title, amount)}
        <p class="text-muted-foreground">
          {$dict.adventures.expense.body(notification.payload.title)}
        </p>
      </div>
    </Base>
  {/snippet}
</Async>
```

> **Note:** verify `currency()` signature — it may accept cents (integer) or dollars. Check `expenses/Created.svelte` uses `numbers.total()` which returns a `number`. Backend sends `amount` as integer cents — may need `amount / 100` or similar. Confirm at implementation time.

**Verify:** `npm run check && npm run lint`

---

### Task 5: Register Adventure Components

**Files:**

- Create: `src/@/notifications/ui/components/adventures/index.ts`
- Modify: `src/@/notifications/ui/components/index.ts` — add adventures import + registration

**Step 1: Barrel export**

```typescript
// adventures/index.ts
import Joined from './Joined.svelte'
import Expense from './Expense.svelte'

export const adventures = {
  joined: Joined,
  expense: Expense,
}
```

**Step 2: Register in component map**

```typescript
// components/index.ts
import { adventures } from './adventures'

export const components = { accounts, groups, expenses, contacts, adventures } as const
```

**Verify:** `npm run check && npm run lint`

---

### Task 6: i18n — Notification Strings

**Step 1: Add keys via mount prefix**

```bash
npx intl add "notifications/adventures.joined.me" "You've been added to {title}"
npx intl add "notifications/adventures.joined.other" "{name} joined {title}"
npx intl add "notifications/adventures.joined.others" "{...names} joined {title}" "accepts array of names and a title, list formatted using Intl.ListFormat"
npx intl add "notifications/adventures.expense.title" "{title} · {amount}"
npx intl add "notifications/adventures.expense.body" "Expense added to {title}"
```

**Verify:** `npm run check && npm run lint`

---

### Task 7: i18n — Transmission Settings Strings

**Step 1: Add keys via mount prefix**

```bash
npx intl add "transmission/settings.adventures.title" "Adventures"
npx intl add "transmission/settings.adventures.description" "Adventure expenses and members"
```

**Verify:** `npm run check && npm run lint`

---

### Task 8: Add Adventures to Transmission Scopes

**Files:**

- Modify: `src/@/transmission/ui/Scopes.ts` — add `{ domain: 'adventures' }`

**Step 1: Add adventures scope**

```typescript
export const scopes = [
  { domain: 'contacts' },
  { domain: 'groups' },
  { domain: 'expenses' },
  { domain: 'adventures' },
] as const
```

**Verify:** `npm run check && npm run lint`

---

### Task 9: Navigation Badge — Adventures Notifications

**Files:**

- Modify: `src/routes/(private)/sections.ts` — add adventures to `unseen` for expenses section

**Step 1: Add adventures domain to expenses badge**

Adventures notifications should badge the expenses tab (since adventures route is already nested under expenses: `nested: ['/adventures/']`).

```typescript
unseen: notifications.some(
  (n) =>
    n.domain === 'expenses' ||
    n.domain === 'adventures' ||
    (n.domain === 'contacts' && n.event === 'transferred'),
),
```

**Verify:** `npm run check && npm run lint`

---

### Task 10: Dev Page — Adventure Notification Mocks

**Files:**

- Modify: `src/routes/(protected)/dev/components/notifications/+page.svelte`

**Step 1: Import adventures store**

Add `import { adventures } from '@/adventures'` to imports.

**Step 2: Add adventure mock notifications**

After groups section, add:

```typescript
// Adventures: me joined
const adventuresList = $adventures
if (ok(adventuresList)) {
  const adventure = adventuresList[0]

  if (adventure) {
    result.unshift(
      create(i++, acc.id, 'adventures', 'joined', adventure.id, {
        title: adventure.title,
        identities: [acc.id],
      }),
    )

    // Adventures: others joined
    if (adventure.participants.length > 1) {
      result.unshift(
        create(i++, acc.id, 'adventures', 'joined', adventure.id, {
          title: adventure.title,
          identities: adventure.participants.filter((id) => id !== acc.id).slice(0, MAX_IDENTITIES),
        }),
      )
    }

    // Adventures: expense
    result.unshift(
      create(i++, acc.id, 'adventures', 'expense', adventure.id, {
        title: adventure.title,
        expense: {
          id: 'mock-expense-id',
          title: 'Sample Adventure Expense',
          date: new Date().toISOString(),
          amount: 4500,
          payer: acc.id,
          attachments: [],
        },
      }),
    )
  }
}
```

> **Note:** verify `adventure.participants` field name — might be `adventure.identities` or similar. Check `Adventure` type at implementation time.

**Verify:** `npm run check && npm run lint`

---

### Task 11: Verification & Commit

- [ ] `npm run check && npm run lint` passes
- [ ] Open dev page `/dev/components/notifications/` — adventure notifications render
- [ ] Scopes settings show "Adventures" toggle
- [ ] Navigation badge triggers on adventure notifications

**Commit:**

```bash
git add -A
git commit -m "feat(adventures): add notification components for joined & expense

adventures domain added to transmission scope types,
notification payloads, UI components, i18n, settings scopes,
navigation badges, and dev mocks"
```
