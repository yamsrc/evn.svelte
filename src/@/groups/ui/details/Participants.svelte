<script lang="ts">
  import { ok } from 'svas'
  import { account } from '@/iam'
  import { Leaderboard, Panel } from '@/contacts/ui'
  import { contacts } from '@/contacts'
  import { dict } from '$lib/intl'
  import { toEntries, type Props } from './Participants'

  const { group, class: classes }: Props = $props()
  const empty = $derived(group.identities.length < 2)
</script>

<div class={['space-y-2', classes]}>
  <h2>{$dict.groups.members.title}</h2>
  {#if ok($account)}
    {#if empty}
      <p class="text-sm text-muted-foreground">{$dict.groups.members.empty}</p>
    {:else if group.reduction}
      {@const entries = toEntries(group, $account, $dict)}
      <Leaderboard {entries} sign="positive" neutral />
    {:else if ok($contacts)}
      {@const identities = group.identities.filter((id) => id !== $account?.id)}
      {#each identities as identity (identity)}
        {@const contact = $contacts.find((c) => c.identity === identity)}
        {#if contact}
          <Panel {contact} balance={group.id} />
        {/if}
      {/each}
    {/if}
  {/if}
</div>
