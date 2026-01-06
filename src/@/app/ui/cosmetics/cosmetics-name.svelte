<script lang="ts">
  import Name from './Name.svelte'
  import type { Props } from './Name'

  interface NameProps extends Props {
    editable?: boolean
  }

  let {
    value = $bindable(''),
    busy = $bindable(false),
    placeholder,
    autocomplete,
    autofocus,
    onchange,
    editable = true,
    class: className,
  }: NameProps = $props()
</script>

<div class="space-y-2">
  {#if editable}
    <Name
      bind:value
      bind:busy
      {onchange}
      {autocomplete}
      {placeholder}
      {autofocus}
      class={className}
    />
  {:else}
    <p class="text-center text-3xl font-bold">{value}</p>
  {/if}
</div>
