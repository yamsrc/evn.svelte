<script lang="ts">
  import { Bot } from '@lucide/svelte'
  import { Spinner } from '$ui/spinner'
  import * as Item from '$ui/item'
  import { dict } from '../intl'
</script>

<Item.Root class="my-8 border-none bg-transparent">
  <Item.Media>
    <Bot />
  </Item.Media>
  <Item.Content>
    <Item.Title>{$dict.pending.status}</Item.Title>
    <Item.Description>{$dict.pending.description}</Item.Description>
  </Item.Content>
  <Item.Actions>
    <Spinner />
  </Item.Actions>
</Item.Root>
