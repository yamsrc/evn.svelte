<script lang="ts">
  import { Button } from '$ui/button'
  import { pickpic } from '@/accounts'
  import Name from './Name.svelte'
  import Picture from './Picture.svelte'
  import type { Props } from './Cosmetics'

  const { value, label, autocomplete, onchange }: Props = $props()
  const blank = $derived(label !== undefined)

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
    await onchange?.({ name, picture })
    busy = false
  }

  function onclick() {
    if (busy || name === '') return

    changed()
  }
</script>

<div class="space-y-6">
  <Picture bind:id={picture} onchange={onPictureChange} />
  <Name bind:value={name} bind:busy onchange={onNameChange} class="mx-auto w-3/4" {autocomplete} />
  {#if blank}
    <Button size="lg" class="w-full" disabled={busy} {onclick}>
      {label}
    </Button>
  {/if}
</div>
