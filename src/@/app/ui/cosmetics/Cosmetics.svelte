<script lang="ts">
  import Name from './Name.svelte'
  import Picture from './Picture.svelte'
  import type { Props } from './Cosmetics'

  const { value, onchange }: Props = $props()
  const blank = $derived(value === undefined)

  let name = $derived(value?.name ?? '')
  let picture = $derived(value?.picture ?? '')
  let busy = $state(false)

  function onNameChange() {
    if (!blank) changed()
  }

  function onPictureChange() {
    if (!blank) changed()
  }

  async function changed() {
    busy = true
    await onchange?.({ name, picture })
    busy = false
  }
</script>

<div class="space-y-6">
  <Picture bind:id={picture} onchange={onPictureChange} />
  <Name bind:name bind:busy onchange={onNameChange} class="mx-auto w-3/4" />
  {#if blank}
    create button
  {/if}
</div>
