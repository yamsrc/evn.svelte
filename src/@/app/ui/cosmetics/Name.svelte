<script lang="ts">
  import NameForm from './NameForm.svelte'
  import type { Props } from './Name'

  let {
    premium,
    value = $bindable(''),
    busy = $bindable(false),
    placeholder,
    autocomplete,
    autofocus,
    onchange,
    editable = true,
    class: classes,
  }: Props = $props()
</script>

{#if editable}
  <NameForm
    bind:value
    bind:busy
    {onchange}
    {autocomplete}
    {placeholder}
    {autofocus}
    class={classes} />
{:else}
  <p class={['text-center text-3xl font-bold', premium && 'text-premium']}>{value}</p>
{/if}
