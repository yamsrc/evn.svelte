# Phase 7: Invitations

[← Back to Plan](../2026-03-10-adventures-implementation.md)

---

### Task 1: Join Route

**Ref:** Follow `src/routes/(public)/join/group/[id=id]/` pattern exactly.

**Files:**
- Create: `src/routes/(public)/join/adventures/[id=id]/+page.server.ts`
- Create: `src/routes/(public)/join/adventures/[id=id]/+page.svelte`
- Create: `src/routes/(public)/join/adventures/[id=id]/Accept.svelte`
- Create: `src/routes/(public)/join/adventures/[id=id]/Accept.ts`

**Step 1: Accept.ts**

```typescript
export interface InvitationLike {
  id: string
  title: string
  picture: string
  identities: string[]
}

export interface Props {
  adventure: InvitationLike
  accepted: boolean
  error: boolean
}
```

**Step 2: Add join i18n keys**

Add `adventures` section to `src/lib/intl/join/` dictionaries:

```bash
npx intl add "join/adventures.og.title" "!js (title) => \`Join \${title} on Evnly\`"
npx intl add "join/adventures.og.description" "Share adventure expenses and keep equal tabs — together on Evnly."
npx intl add "join/adventures.dialog.title" "!js (title) => \`Join \${title}\`"
npx intl add "join/adventures.dialog.join" "Join"
npx intl add "join/adventures.dialog.decline" "Decline"
```

**Step 3: +page.server.ts**

Load adventure invitation (anonymous). On error → redirect to `/`. `invitations.get()` returns invitation payload, not full CRUD adventure. OG meta with dynamic cover picture + localized title/description.

```typescript
import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import { origin } from '$config'
import { acceptable } from '$lib/intl'
import { dictionaries } from '$lib/intl/join'
import { invitations } from '@/adventures'

export const load: PageServerLoad = async ({ params, request }) => {
  const adventure = await invitations.get(params.id)
  if (adventure instanceof Error) return redirect(302, '/')

  const locale = acceptable(request.headers.get('accept-language'))
  const dict = dictionaries[locale]
  const url = `${origin}/pictures/${adventure.picture}.600x400!.jpeg`

  return {
    adventure,
    meta: {
      title: dict.adventures.og.title(adventure.title),
      description: dict.adventures.og.description,
      image: {
        url,
        width: 600,
        height: 400,
        type: 'image/jpg',
      },
    } satisfies App.PageData['meta'],
  }
}
```

**Step 4: +page.svelte**

Orchestrator: show adventure info, wrap in `<Authenticated>`, redirect after accept.

```svelte
<script lang="ts">
  import { page } from '$app/state'
  import { Screen, Authenticated, Goto } from '@/app/ui'
  import Accept from './Accept.svelte'

  const adventure = page.data.adventure
  let accepted = $state(false)
  let error = $state(!adventure)
</script>

{#if error}
  <Goto href="/" />
{:else}
  <Screen>
    <Authenticated>
      {#if accepted}
        <Goto href="/" />
      {/if}
    </Authenticated>
  </Screen>
  <Accept {adventure} bind:accepted bind:error />
{/if}
```

**Step 5: Accept.svelte**

AlertDialog with adventure cover + title. On confirm: `having(account)` → `named()` → `invitations.accept(id)`.

```svelte
<script lang="ts">
  import { having } from 'svas'
  import { account, named } from '@/iam'
  import { invitations } from '@/adventures'
  import * as AlertDialog from '$ui/alert-dialog'
  import type { Props } from './Accept'

  let { adventure, accepted = $bindable(), error = $bindable() }: Props = $props()
  let open = $state(true)

  async function onclick() {
    open = false
    await having(account)
    await named()
    const res = await invitations.accept(adventure.id)
    if (res instanceof Error) error = true
    else accepted = true
  }
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Content>
  </AlertDialog.Content>
</AlertDialog.Root>
```

**Verify:** `npm run check && npm run lint`

---

### Acceptance (Agent UI Testing)

Agent opens app in browser and verifies:

- [x] Open `/join/adventures/{id}/` (logged out) — page renders with adventure cover + title in dialog
- [x] "Join" button → triggers auth flow → after auth, adventure accepted, redirects to home
- [x] "Decline" button → dialog closes
- [x] Invalid invitation ID → redirects to `/`

---

**Commit:**

```
feat(adventures): add join invitation route

Public page for accepting adventure invitations.
```
