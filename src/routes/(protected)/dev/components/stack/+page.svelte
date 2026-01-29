<script lang="ts">
  import { ChevronsDownUp, Trash2 } from '@lucide/svelte'
  import * as Stack from '$lib/components/stack'
  import { Button } from '$lib/components/ui/button'
  import { delay } from '$lib/tools'
  import { transit } from '$lib/tools/svt'
  import { Section, Header } from '@/app/ui'

  type Item = { id: string; color: string; height: number }
  type Ref = { remove: () => Promise<void> | void }

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']
  const randHeight = () => Math.floor(Math.random() * (120 - 56) + 56)

  let stack: ReturnType<typeof Stack.Root> | undefined = $state()
  let expanded = $state(false)
  const refs = $state<Array<Ref | undefined>>([])

  let items = $state<Item[]>(
    COLORS.map((color, i) => ({ id: `item-${i}`, color, height: randHeight() })),
  )

  function removeItem(id: string) {
    transit(() => (items = items.filter((i) => i.id !== id)))
  }

  async function clearAll() {
    const removed = refs.map((ref, i) => delay(() => ref?.remove(), i * 50))

    await Promise.all(removed)

    transit(() => (items = []))
  }
</script>

<a href="/">Home</a>

<Section>
  <Header.Root>
    <Header.Title>Stack</Header.Title>
  </Header.Root>
</Section>

<Section>
  <Stack.Root bind:this={stack} bind:expanded>
    {#each items as item, i (item.id)}
      <Stack.Item id={item.id}>
        <div
          role="presentation"
          onclick={() => removeItem(item.id)}
          class="rounded-lg flex items-center justify-center"
          style:background-color={item.color}
          style:height="{item.height}px">
          <span class="text-white font-medium">{item.id}</span>
        </div>
      </Stack.Item>
    {/each}
    <Stack.Footer>
      <Section class="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          class="text-muted-foreground"
          onclick={() => stack?.collapse()}>
          <ChevronsDownUp size={16} />
          Collapse
        </Button>
        <Button variant="ghost" size="sm" class="text-muted-foreground" onclick={clearAll}>
          <Trash2 size={16} />
          Clear all
        </Button>
      </Section>
    </Stack.Footer>
  </Stack.Root>
</Section>
