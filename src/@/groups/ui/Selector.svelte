<script lang="ts">
  import { ChartPie } from '@lucide/svelte'
  import { groups } from '@/groups'
  import { List } from '@/app/ui'
  import { buttonVariants } from '$ui/button'
  import { dict } from './intl'
  import Card from './Card.svelte'
  import type { Props } from './Selector'

  const { id, onchange }: Props = $props()

  const picked = $derived(id ? $groups.findIndex((group) => group.id === id) + 1 : 0)

  function onpick(index: number) {
    if (index === picked) return

    onchange?.(index === 0 ? undefined : $groups[index - 1].id)
  }

  const card = 'overflow-hidden'
</script>

{#if $groups.length > 0}
  <List.Root {picked} {onpick} align="start" class="py-1 -my-1">
    <List.Option
      index={0}
      class={[
        buttonVariants({ variant: 'outline' }),
        card,
        'w-20! flex-col items-center justify-center text-muted-foreground',
      ]}>
      <ChartPie />
      <span class="text-sm">{$dict.selector.none}</span>
    </List.Option>

    {#each $groups as group, index (group.id)}
      <List.Option variant="outline" index={index + 1} class={card}>
        <Card {group} />
      </List.Option>
    {/each}
  </List.Root>
{/if}
