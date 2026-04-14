<script lang="ts">
  import { Bot, RotateCcw } from '@lucide/svelte'
  import * as Item from '$ui/item'
  import { Button } from '$ui/button'
  import { dict } from './intl'
  import type { Props } from './Failed'

  const { onretry }: Props = $props()
</script>

<Item.Root>
  <Item.Media>
    <Bot />
  </Item.Media>
  <Item.Content>
    <Item.Title>{$dict.failed.title}</Item.Title>
    <Item.Description>{$dict.failed.description}</Item.Description>
    <div class="mt-2">
      <Button onclick={onretry} class="min-w-40">
        <RotateCcw />
        {$dict.failed.retry.label}
      </Button>
    </div>
  </Item.Content>
</Item.Root>
