<script lang="ts">
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import { pickpic } from '@/accounts'
  import Name from './Name.svelte'
  import Picture from './Picture.svelte'
  import type { Props, Value } from './Cosmetics'

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

<div class={cn('space-y-6', classes)}>
  <div class="flex justify-center" data-slot="picture">
    <Picture bind:id={picture} onchange={onPictureChange} />
  </div>
  <div class="space-y-2">
    {#if editable}
      <Name
        bind:value={name}
        bind:busy
        onchange={onNameChange}
        {autocomplete}
        {placeholder}
        {autofocus}
      />
      {#if note}
        <p class="text-muted-foreground text-sm text-center">{note}</p>
      {/if}
    {:else}
      <p class="text-center text-3xl font-bold">{name}</p>
    {/if}
  </div>
  {#if blank}
    <Button
      id="app-cosmetics-submit-button"
      size="lg"
      class="w-full"
      disabled={busy || !name.trim()}
      {onclick}
    >
      {label}
    </Button>
  {/if}
</div>
