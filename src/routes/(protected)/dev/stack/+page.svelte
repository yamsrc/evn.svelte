<script lang="ts">
  import { ChevronsDownUp } from '@lucide/svelte'
  import { Section, Header } from '@/app/ui'
  import { Button } from '$ui/button'
  import { transit } from '$lib/tools'
  import { dict } from '$lib/intl/dev'
  import * as Stack from '$com/stack'

  type Item = { id: string; color: string; height: number }

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']
  const randHeight = () => Math.floor(Math.random() * (120 - 56) + 56)

  const stacks = $state<ReturnType<typeof Stack.Root>[]>([])

  let items = $state<Item[]>(
    COLORS.map((color, i) => ({ id: `item-${i}`, color, height: randHeight() })),
  )

  function removeItem(id: string) {
    transit(() => (items = items.filter((i) => i.id !== id)))
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.components.stack.title}</Header.Title>
  </Header.Root>
</Section>

{#snippet content({ item }: { item: Item })}
  <div
    role="presentation"
    onclick={() => removeItem(item.id)}
    class="rounded-lg flex items-center justify-center"
    style:background-color={item.color}
    style:height="{item.height}px">
    <span class="text-white font-medium">{item.id}</span>
  </div>
{/snippet}

<Section>
  <Stack.Root bind:this={stacks[0]}>
    {#each items as item (item.id)}
      <Stack.Item id={item.id}>
        {@render content({ item })}
      </Stack.Item>
    {/each}
    <Stack.Toolbar>
      <Section class="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          class="text-muted-foreground"
          onclick={() => stacks[0]?.collapse()}>
          <ChevronsDownUp size={16} />
          {$dict.components.stack.collapse}
        </Button>
      </Section>
    </Stack.Toolbar>
  </Stack.Root>
</Section>

<Section>
  <Stack.Root bind:this={stacks[1]}>
    <Stack.Toolbar>
      <Section class="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          class="text-muted-foreground"
          onclick={() => stacks[1]?.collapse()}>
          <ChevronsDownUp size={16} />
          {$dict.components.stack.collapse}
        </Button>
      </Section>
    </Stack.Toolbar>
    {#each items as item (item.id)}
      <Stack.Item id={item.id}>
        {@render content({ item })}
      </Stack.Item>
    {/each}
  </Stack.Root>
</Section>
