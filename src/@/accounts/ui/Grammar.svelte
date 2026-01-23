<script lang="ts">
  import { dict } from '$lib/intl'
  import * as ToggleGroup from '$ui/toggle-group'
  import { update, type Grammar } from '@/accounts'
  import { options, type Props, type Value } from './Grammar'

  const { account }: Props = $props()

  let busy = $state(false)
  let value = $derived<Value>(account.grammar ?? '')
  const key = $derived(value === '' ? 'they' : value)

  async function onValueChange(value: string) {
    const grammar = value === '' ? null : (value as Grammar)

    busy = true
    await update(account.id, { grammar })
    busy = false
  }

  // `disabled` applies redundant styles
  function onclick(e: MouseEvent) {
    if (busy) e.preventDefault()
  }
</script>

<ToggleGroup.Root bind:value type="single" variant="outline" size="lg" {onValueChange}>
  {#each options as option (option.value)}
    <ToggleGroup.Item
      value={option.value}
      class="border-border size-12 [&_svg]:transition-colors [&_svg]:text-muted-foreground data-[state=on]:[&_svg]:text-foreground"
      {onclick}>
      <option.Icon class="size-5" />
    </ToggleGroup.Item>
  {/each}
</ToggleGroup.Root>
<p class="text-sm italic">{$dict.profile.grammar.examples[key](account.name)}</p>
