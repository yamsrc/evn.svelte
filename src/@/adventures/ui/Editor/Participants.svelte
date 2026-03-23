<script lang="ts">
  import { Async } from 'svas'
  import { accounts } from '@/accounts'
  import { Panel } from '@/accounts/ui'
  import { add } from '@/adventures'
  import { Participants } from '@/app/ui'
  import { account } from '@/iam'
  import { dict } from '../intl'
  import { getContext } from './Context'
  import type { Props } from './Participants'

  let { value = $bindable(), busy = $bindable(false), class: classes }: Props = $props()

  const ctx = getContext()

  const entries = $derived(
    value.participants.map((id) => ({
      id,
      name: id === $account?.id ? $dict.me : undefined,
    })),
  )

  const empty = $derived(
    entries.length === 0 || (entries.length === 1 && entries[0].id === $account?.id),
  )

  async function onadd(identities: string[]) {
    if (ctx.id !== undefined) {
      busy = true

      const adventure = await add(ctx.id, identities)

      busy = false

      if (adventure instanceof Error) return
    }

    value.participants = Array.from(new Set([...value.participants, ...identities]))
  }
</script>

<div class={['space-y-2', classes]}>
  <h2>{$dict.participants.title}</h2>
  {#if empty}
    <p class="text-sm text-muted-foreground">{$dict.participants.empty}</p>
  {:else}
    {#each entries as entry (entry.id)}
      <Async store={accounts.get(entry.id)}>
        {#snippet awaited(account)}
          <Panel account={{ ...account, name: entry.name ?? account.name }} />
        {/snippet}
      </Async>
    {/each}
  {/if}

  <Participants.Add
    id="adventures-editor-members-button"
    exclude={value.participants}
    {onadd}
    disabled={busy}
    class="w-full" />
</div>
