<script lang="ts">
  import { Crown } from '@lucide/svelte'
  import { channel } from '@/purchases'
  import * as Item from '$ui/item'
  import { Button } from '$ui/button'
  import { date } from '$lib/tools'
  import { grammar, locale } from '$lib/intl'
  import { dict } from './intl'
  import type { Props } from './Subscription'

  const { account, class: classes }: Props = $props()

  const apple = $derived(channel()?.kind === 'apple' && account.processor === 'appstore')
  const stripe = $derived(channel()?.kind === 'stripe' && account.processor === 'stripe')

  const manageable = $derived(apple || stripe)

  let busy = $state(false)

  async function manage() {
    const ch = channel()

    if (ch === null) return

    busy = true

    const result = await ch.manage()

    busy = false

    if (result instanceof Error) console.error(result)
  }
</script>

<Item.Root class={classes}>
  <Item.Media class="bg-primary rounded-full p-2">
    <Crown class="size-full text-primary-foreground" fill="currentColor" />
  </Item.Media>
  <Item.Content>
    <Item.Title>{$dict.subscription.active}</Item.Title>
    <Item.Description>
      {$dict.subscription.expires(date(account.premium, $locale), $grammar)}
    </Item.Description>
  </Item.Content>
  {#if manageable}
    <Item.Actions>
      <Button onclick={manage} size="sm" variant="outline" disabled={busy}>
        {$dict.subscription.manage}
      </Button>
    </Item.Actions>
  {/if}
</Item.Root>
