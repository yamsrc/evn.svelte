<script lang="ts">
  import { Async, ok } from 'svas'
  import { account } from '@/iam'
  import { add } from '@/groups'
  import { contacts } from '@/contacts'
  import { Participants } from '@/app/ui'
  import { Panel } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { dict } from '$lib/intl'
  import { getContext } from './Context'
  import type { Props } from './Participants'

  let { identities = $bindable(), busy = $bindable(false), class: classes }: Props = $props()

  const ctx = getContext()

  const others = $derived(identities.filter((id) => id !== $account?.id))

  async function onadd(added: string[]) {
    if (ctx.id !== undefined) {
      busy = true

      const result = await add(ctx.id, added)

      busy = false

      if (result instanceof Error) return
    }

    identities = Array.from(new Set([...identities, ...added]))
  }
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    <div class={['space-y-2', classes]}>
      <h2>{$dict.groups.members.title}</h2>
      {#if others.length === 0}
        <p class="text-sm text-muted-foreground">{$dict.groups.members.empty}</p>
      {:else}
        {#each others as id (id)}
          {@const contact = contacts.find((c) => c.identity === id)}
          {#if contact?.account && ok(contact.account)}
            <Panel
              account={contact.account}
              balance={ctx.id ? contact.balances?.[ctx.id] : contact.balance}
              href={`/contacts/${id}/`} />
          {:else}
            <Async store={accounts.get(id)}>
              {#snippet awaited(account)}
                <Panel {account} />
              {/snippet}
            </Async>
          {/if}
        {/each}
      {/if}

      <Participants.Add
        id="groups-editor-members-button"
        exclude={identities}
        {onadd}
        disabled={busy}
        class="w-full" />
    </div>
  {/snippet}
</Async>
