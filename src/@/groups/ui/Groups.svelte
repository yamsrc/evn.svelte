<script lang="ts">
  import { ChevronUp, ChevronDown } from '@lucide/svelte'
  import Section from '$com/section/Section.svelte'
  import { cn } from '$lib/utils'
  import { buttonVariants } from '$ui/button'
  import * as Collapsible from '$ui/collapsible'
  import { filter } from '@/groups'
  import Group from './Group.svelte'
  import type { Props } from './Groups'

  let { groups, title, selection = $bindable(), search }: Props = $props()

  let open = $state(true)

  const selectable = $derived(!!selection)

  function onselect(id: string, selected: boolean) {
    if (!selection) return

    if (selected) selection.add(id)
    else selection.delete(id)
  }
</script>

<Section>
  <Collapsible.Root bind:open class="flex flex-col gap-1.5">
    {#if title}
      <div class="flex items-center justify-between">
        <h2>{title}</h2>
        <Collapsible.Trigger
          class={cn(buttonVariants({ variant: 'secondary', size: 'icon' }), 'rounded-full size-6')}
        >
          {#if open}
            <ChevronUp class="size-4" />
          {:else}
            <ChevronDown class="size-4" />
          {/if}
        </Collapsible.Trigger>
      </div>
    {/if}
    <Collapsible.Content class="flex flex-col gap-1.5">
      {#each filter(groups, search) as group (group.id)}
        {@const selected = selection?.has(group.id)}
        {@const selectedProps = selectable ? { selected, onselect } : undefined}
        <Group {group} {...selectedProps} />
      {/each}
    </Collapsible.Content>
  </Collapsible.Root>
</Section>
