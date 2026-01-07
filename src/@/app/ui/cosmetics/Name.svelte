<script lang="ts">
  import NameForm from './NameForm.svelte'
  import type { Props } from './NameForm'

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
    class: classes,
  }: NameProps = $props()
</script>

{#if editable}
  <NameForm
    bind:value
    bind:busy
    {onchange}
    {autocomplete}
    {placeholder}
    {autofocus}
    class={classes}
  />
{:else}
  <p class="text-center text-3xl font-bold">{value}</p>
{/if}
