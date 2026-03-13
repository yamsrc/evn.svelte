<script lang="ts">
  import { Async } from 'svas'
  import { Progress } from '$ui/progress'
  import { accounts } from '@/accounts'
  import { Panel } from '@/accounts/ui'
  import type { Props } from './Leaderboard'

  const { entries, sign = 'negative', neutral, top }: Props = $props()

  const sorted = $derived([...entries].sort((a, b) => Math.abs(b.value) - Math.abs(a.value)))
  const visible = $derived(top ? sorted.slice(0, top) : sorted)
  const total = $derived(visible.reduce((sum, entry) => sum + Math.abs(entry.value), 0))
</script>

<ul class="space-y-2">
  {#each visible as entry (entry.id)}
    <li>
      <Async store={accounts.get(entry.id)}>
        {#snippet awaited(account)}
          <Panel
            account={{ ...account, name: entry.name ?? account.name }}
            balance={entry.value}
            href={entry.href}
            {neutral} />
        {/snippet}
      </Async>
      {#if entries.length > 1}
        <div class="px-1">
          <Progress
            value={total > 0 ? (Math.abs(entry.value) / total) * 100 : 0}
            class={[
              'h-1',
              sign === 'positive' &&
                'bg-constructive/20 [&_div[data-slot=progress-indicator]]:bg-constructive',
            ]} />
        </div>
      {/if}
    </li>
  {/each}
</ul>
