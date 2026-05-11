<script lang="ts">
  import { ok } from 'svas'
  import { expenses, numbers } from '@/expenses'
  import { List } from '@/app/ui'
  import { goto } from '$app/navigation'
  import Card from './Card.svelte'
  import type { Props } from './Cards'

  const { groups, extended = false, class: classes }: Props = $props()

  function onpick(index: number) {
    void goto(`/contacts/groups/${groups[index].id}`)
  }

  const totals = $derived.by(() => {
    const result: Record<string, number> = {}

    if (!extended || !ok($expenses)) return result

    for (const group of groups)
      result[group.id] = $expenses
        .filter((e) => e.links?.some((l) => l.type === 'group' && l.id === group.id))
        .reduce((sum, e) => sum + numbers.total(e), 0)

    return result
  })
</script>

<List.Root {onpick} align="start" class={['py-1 -my-1', classes]}>
  {#each groups as group, index (group.id)}
    <List.Option
      variant="outline"
      {index}
      class={['overflow-hidden', extended && 'w-[calc(65%-var(--spacing))]']}>
      <Card {group} {extended} total={totals[group.id] ?? 0} />
    </List.Option>
  {/each}
</List.Root>
