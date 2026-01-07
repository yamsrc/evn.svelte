<script lang="ts">
  import { pickpic } from '@/accounts'
  import Actions from './cosmetics-actions.svelte'
  import Name from './cosmetics-name.svelte'
  import Note from './cosmetics-note.svelte'
  import Picture from './cosmetics-picture.svelte'
  import Root from './cosmetics-root.svelte'
  import type { Props, Value } from './Cosmetics'

  // Default implementation for backward compatibility
  const {
    value,
    placeholder,
    editable = true,
    label,
    note,
    class: classes,
    autocomplete,
    autofocus,
    onchange,
  }: Props = $props()

  const blank = $derived(editable && label !== undefined)

  let name = $derived(value?.name ?? '')
  let picture = $derived(value?.picture ?? pickpic())
  let busy = $state(false)

  function onNameChange() {
    changed()
  }

  function onPictureChange() {
    if (!blank) changed()
  }

  async function changed() {
    busy = true

    const value: Value = { name, picture }

    await onchange?.(value)
    busy = false
  }

  function onclick() {
    if (busy || name.trim() === '') return

    changed()
  }
</script>

<Root class={classes}>
  <Picture bind:id={picture} onchange={onPictureChange} />
  <div class="space-y-2">
    <Name
      bind:value={name}
      bind:busy
      onchange={onNameChange}
      {autocomplete}
      {placeholder}
      {autofocus}
      {editable}
    />
    {#if note}
      <Note>{note}</Note>
    {/if}
  </div>
  {#if blank && label}
    <Actions {label} {busy} {onclick} />
  {/if}
</Root>
