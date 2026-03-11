<script lang="ts">
  import { Leaderboard } from '@/contacts/ui'
  import { account as me } from '@/iam'
  import { dict } from './intl'
  import type { Props } from './Members'

  const { identities, participants, class: classes }: Props = $props()

  const entries = $derived(
    identities.map((id) => ({
      id,
      value: participants[id] ?? 0,
      name: id === $me?.id ? $dict.members.me : undefined,
    })),
  )
</script>

<div class={['space-y-2', classes]}>
  <h2>{$dict.members.title}</h2>
  {#if entries.length === 0}
    <p class="text-sm text-muted-foreground">{$dict.members.empty}</p>
  {:else}
    <Leaderboard {entries} sign="positive" />
  {/if}
</div>
