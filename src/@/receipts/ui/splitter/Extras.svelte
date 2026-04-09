<script lang="ts">
  import { Pencil } from '@lucide/svelte'
  import { Coins } from '@/app/ui'
  import * as Item from '$ui/item'
  import { Button } from '$ui/button'
  import { styles, transit } from '$lib/tools'
  import { dict } from '../intl'
  import Extra from './Extra.svelte'
  import type { Props } from './Extras'

  // const style =
  //   'view-transition-name: receipts-splitter-extras; view-transition-class: transition-spring transition-morph;'
  const style = styles('receipts-splitter-extras', 'transition-spring transition-morph')

  const { receipt }: Props = $props()
  const included = $derived(receipt.extras.filter((e) => e.included))

  const total = $derived(
    receipt.extras.filter((e) => e.included).reduce((acc, extra) => acc + extra.amount, 0),
  )

  let edit = $state(false)

  function toggle() {
    transit(() => (edit = !edit))
  }
</script>

{#if edit && included.length > 0}
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
{:else if total > 0}
  <div
    class={['px-4 flex items-center justify-between', 'text-sm text-muted-foreground']}
    style={$style}>
    <div class="inline-flex items-center">
      <span class="py-1">{$dict.extras.included}</span>
      <Button variant="ghost" size="sm" onclick={toggle}>
        <Pencil />
      </Button>
    </div>
    <Coins amount={total} sign="neutral" />
  </div>
{/if}
