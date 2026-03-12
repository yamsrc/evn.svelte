<script lang="ts">
  import { update, managed as contacts } from '@/accounts'
  import * as ToggleGroup from '$ui/toggle-group'
  import { cn } from '$lib/utils'
  import { dict, type Grammar } from '$lib/intl'
  import { options, type Props, type Value } from './Grammar'

  const { account, managed, class: classes }: Props = $props()

  let busy = $state(false)
  let value = $derived<Value>(account.grammar ?? '')

  async function onValueChange(value: string) {
    const grammar = value === '' ? null : (value as Grammar)

    busy = true

    if (managed) await contacts.update(account.id, { grammar })
    else await update(account.id, { grammar })

    busy = false
  }

  // `disabled` applies redundant styles
  function onclick(e: MouseEvent) {
    if (busy) e.preventDefault()
  }
</script>

<div class={cn('flex flex-col gap-2', classes)}>
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
  {#if !managed}
    <p class="text-muted-foreground text-sm italic">
      {$dict.profile.grammar.example(account.name, value)}
    </p>
  {/if}
</div>
