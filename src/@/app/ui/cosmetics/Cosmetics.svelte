<script lang="ts">
  import { pickpic } from '@/accounts'
  import { Spinner } from '$ui/spinner'
  import { cn } from '$lib/utils'
  import Root from './Root.svelte'
  import Picture from './Picture.svelte'
  import Note from './Note.svelte'
  import Name from './Name.svelte'
  import Content from './Content.svelte'
  import Actions from './Actions.svelte'
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
    onupload,
    pictureStyle,
    children,
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

  const uploadable = $derived(editable && onupload)

  let uploadEl = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)

  async function onUploadChange(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]

    // reset
    target.value = ''

    if (file) {
      uploading = true
      busy = true
      await onupload?.(file)
      uploading = false
      busy = false
    }
  }
</script>

<Root class={classes}>
  <Content>
    <button
      data-slot="picture"
      disabled={!uploadable || busy}
      onclick={() => uploadEl?.click()}
      class={cn('relative', uploadable && 'hover:cursor-pointer')}>
      <Picture bind:id={picture} onchange={onPictureChange} style={pictureStyle} />
      {#if uploading}
        <Spinner class="absolute right-0 bottom-0 text-muted-foreground" />
      {/if}
    </button>
    {#if uploadable}
      <input bind:this={uploadEl} type="file" accept="image/*" hidden onchange={onUploadChange} />
    {/if}
    <div class="space-y-2 w-full">
      <Name
        bind:value={name}
        bind:busy
        onchange={onNameChange}
        {autocomplete}
        {placeholder}
        {autofocus}
        {editable}
        class="w-full" />
      {#if note}
        <Note>{note}</Note>
      {/if}
    </div>
    {@render children?.()}
  </Content>
  {#if blank && label}
    <Actions {label} {busy} {onclick} />
  {/if}
</Root>
