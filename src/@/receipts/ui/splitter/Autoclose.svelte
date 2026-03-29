<script lang="ts">
  import { ChartPie } from '@lucide/svelte'
  import { Switch } from '$ui/switch'
  import * as Item from '$ui/item'
  import { transit } from '$lib/tools'
  import { dict } from '../intl'

  let checked = $state(false)

  function onCheckedChange(value: boolean) {
    transit(() => (checked = value))
  }
</script>

<label
  for="autoclose-switch"
  class="block cursor-pointer"
  style="view-transition-name: splitter-autoclose-switch;">
  <Item.Root class="items-start">
    <Item.Media>
      <ChartPie class="text-muted-foreground" />
    </Item.Media>
    <Item.Content>
      <Item.Title>{$dict.autoclose.title}</Item.Title>
      <Item.Description>{$dict.autoclose.description}</Item.Description>
      {#if checked}
        Who paid?
      {/if}
    </Item.Content>
    <Item.Actions class="pt-1.5">
      <Switch id="autoclose-switch" {onCheckedChange} />
    </Item.Actions>
  </Item.Root>
</label>
