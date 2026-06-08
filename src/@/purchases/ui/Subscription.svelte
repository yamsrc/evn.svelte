<script lang="ts">
  import { Crown } from '@lucide/svelte'
  import * as Item from '$ui/item'
  import { date } from '$lib/tools'
  import { grammar, locale } from '$lib/intl'
  import { dict } from './intl'
  import type { Props } from './Subscription'

  const { premium, class: classes }: Props = $props()
</script>

<Item.Root class={classes}>
  <Item.Media class="bg-premium rounded-full p-2">
    <Crown class="size-full text-black" fill="currentColor" />
  </Item.Media>
  <Item.Content>
    <Item.Title>{$dict.subscription.active}</Item.Title>
    <Item.Description>
      {$dict.subscription.expires(date(premium, $locale), $grammar)}
    </Item.Description>
  </Item.Content>
</Item.Root>
