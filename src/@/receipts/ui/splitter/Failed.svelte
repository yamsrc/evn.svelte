<script lang="ts">
  import { Bot, RotateCcw } from '@lucide/svelte'
  import * as Item from '$ui/item'
  import { dict } from '../intl'
  import Upload from '../Upload.svelte'
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
    <div class="mt-4 flex flex-col">
      <Upload onstart={onretry}>
        <RotateCcw />
        Try again
      </Upload>
    </div>
  </Item.Content>
</Item.Root>
