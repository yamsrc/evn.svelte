<script lang="ts">
  import { Async } from 'svas'
  import { Panel } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { Progress } from '$ui/progress'
  import type { Props } from './Leaderboard'

  const { entries, absolute, top }: Props = $props()

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
            labeled={false}
            {absolute}
            href={entry.href} />
        {/snippet}
      </Async>
      {#if entries.length > 1}
        <div class="px-1">
          <Progress
            value={total > 0 ? (Math.abs(entry.value) / total) * 100 : 0}
            class={[
              'h-1',
              entry.value > 0 &&
                'bg-constructive/20 [&_div[data-slot=progress-indicator]]:bg-constructive',
              entry.value < 0 &&
                'bg-destructive/20 [&_div[data-slot=progress-indicator]]:bg-destructive',
            ]} />
        </div>
      {/if}
    </li>
  {/each}
</ul>
