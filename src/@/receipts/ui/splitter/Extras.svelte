<script lang="ts">
  import { Pencil } from '@lucide/svelte'
  import { Coins } from '@/app/ui'
  import * as Item from '$ui/item'
  import { Button } from '$ui/button'
  import { styles, transit } from '$lib/tools'
  import { dict } from '../intl'
  import Extra from './Extra.svelte'
  import type { Props } from './Extras'

  const style = styles('receipts-splitter-extras', 'transition-spring transition-morph')

  const { receipt, stats }: Props = $props()
  const included = $derived(receipt.extras.filter((e) => e.included))

  const total = $derived(
    receipt.extras.filter((e) => e.included).reduce((acc, extra) => acc + extra.amount, 0),
  )

  let edit = $state(false)

  async function toggle() {
    await transit(() => (edit = !edit))

    if (edit === true && stats.incomplete) setTimeout(() => transit(() => (edit = false)), 5000)
  }
</script>

{#if included.length > 0}
  {#if edit}
    {#if stats.incomplete}
      <div class="inline-flex items-center min-h-8">
        <p class="text-sm text-muted-foreground py-1 px-4">
          {$dict.extras.incomplete}
        </p>
      </div>
    {:else}
      <Item.Root class="py-2 mt-2" style={$style}>
        <Item.Content>
          <ul>
            {#each included as extra (extra.id)}
              <li>
                <Extra {receipt} {extra} />
              </li>
            {/each}
          </ul>
        </Item.Content>
      </Item.Root>
    {/if}
  {:else}
    <div
      class={['px-4 flex items-center justify-between', 'text-sm text-muted-foreground']}
      style={$style}>
      <div class="inline-flex items-center min-h-8">
        <span class="py-1">{$dict.extras.included}</span>
        {#if !receipt.locked}
          <Button variant="ghost" size="sm" onclick={toggle}>
            <Pencil />
          </Button>
        {/if}
      </div>
      <Coins amount={total} sign="neutral" absolute={false} />
    </div>
  {/if}
{/if}
