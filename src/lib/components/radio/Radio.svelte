<script lang="ts">
  import * as RadioGroup from '$ui/radio-group'
  import { Label } from '$ui/label'
  import { cn } from '$lib/utils'
  import type { Props } from './Radio'

  let { name, value = $bindable(''), options, class: classes, onchange }: Props = $props()
</script>

<RadioGroup.Root
  bind:value
  {name}
  class={cn('grid grid-cols-3 gap-2', classes)}
  onValueChange={onchange}
>
  {#each options as option (option.value)}
    {@const selected = value === option.value}
    <Label
      class={cn(
        'flex flex-col items-start p-3 gap-2 rounded-md border transition-colors',
        selected
          ? 'bg-accent text-accent-foreground'
          : 'cursor-pointer bg-background/90 hover:bg-accent/50',
      )}
    >
      <RadioGroup.Item value={option.value} class="sr-only" />
      {#if option.Icon}
        <option.Icon class={option.iconClass} />
      {/if}
      {#if typeof option.label === 'string'}
        <span>{option.label}</span>
      {:else if typeof option.label === 'function'}
        {@render option.label()}
      {/if}
    </Label>
  {/each}
</RadioGroup.Root>
