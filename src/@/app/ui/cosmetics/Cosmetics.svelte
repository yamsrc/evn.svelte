<script lang="ts">
  import { Button } from '$ui/button'
  import { pickpic } from '@/accounts'
  import Name from './Name.svelte'
  import Picture from './Picture.svelte'
  import type { Props, Value } from './Cosmetics'

  const {
    value,
    picture: pictureEnabled = false,
    label,
    note,
    autocomplete,
    onchange,
  }: Props = $props()
  const blank = $derived(label !== undefined)

  let name = $derived(value?.name ?? '')
  let picture = $derived(pictureEnabled ? (value?.picture ?? pickpic()) : undefined)
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
    if (busy || name === '') return

    changed()
  }
</script>

<div class="space-y-6">
  {#if picture}
    <Picture bind:id={picture} onchange={onPictureChange} />
  {/if}
  <div class="space-y-2">
    <Name bind:value={name} bind:busy onchange={onNameChange} {autocomplete} />
    {#if note}
      <p class="text-muted-foreground text-sm text-center">{note}</p>
    {/if}
  </div>
  {#if blank}
    <Button size="lg" class="w-full" disabled={busy || !name.trim()} {onclick}>
      {label}
    </Button>
  {/if}
</div>
