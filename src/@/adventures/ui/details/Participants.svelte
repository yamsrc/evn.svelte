<script lang="ts">
  import { account } from '@/iam'
  import { Leaderboard } from '@/contacts/ui'
  import { dict } from '../intl'
  import type { Props } from './Participants'

  const { participants, class: classes }: Props = $props()

  const entries = $derived(
    Object.entries(participants).map(([id, value]) => ({
      id,
      value: value ?? 0,
      name: id === $account?.id ? $dict.me : undefined,
      href: id === $account?.id ? '/me/' : `/contacts/${id}/`,
    })),
  )

  const empty = $derived(
    entries.length === 0 || (entries.length === 1 && entries[0].id === $account?.id),
  )
</script>

<div class={['space-y-2', classes]}>
  <h2>{$dict.participants.title}</h2>
  {#if empty}
    <p class="text-sm text-muted-foreground">{$dict.participants.empty}</p>
  {:else}
    <Leaderboard {entries} sign="positive" neutral />
  {/if}
</div>
