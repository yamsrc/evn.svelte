<script lang="ts">
  import { ImageUp } from '@lucide/svelte'
  import { presets, upload } from '@/adventures'
  import { buttonVariants } from '$ui/button'
  import { Loader } from '$com/loader'
  import * as List from './list'
  import { dict } from './intl'
  import Picture from './Picture.svelte'
  import type { Props } from './Cover'

  const UPLOAD = 1

  let { picture = $bindable(''), onchange }: Props = $props()

  let input = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)

  let uploaded = $state<string | null>(picture && !presets.includes(picture) ? picture : null)

  const options = $derived(uploaded ? [uploaded, ...presets] : presets)
  const picked = $derived(picture ? options.indexOf(picture) + UPLOAD : undefined)

  const card = 'aspect-[1.4] overflow-hidden rounded-lg'

  function onpick(index: number) {
    picture = options[index - UPLOAD]
    onchange?.(picture)
  }

  async function handleUpload(event: Event) {
    const target = event.target as HTMLInputElement

    if (!target.files?.length) return

    uploading = true

    const entry = await upload(target.files[0])

    uploading = false
    target.value = ''

    if (entry instanceof Error) return

    uploaded = entry.id
    picture = entry.id
    onchange?.(entry.id)
  }
</script>

<div class="space-y-2">
  <h2>{$dict.editor.cover}</h2>
  <input type="file" accept="image/*" bind:this={input} onchange={handleUpload} class="hidden" />

  <List.Root {picked} {onpick} align="center" class="py-1 -my-1">
    <List.Option
      id="adventures-cover-upload-button"
      variant="outline"
      onclick={() => input?.click()}
      disabled={uploading}
      class={[
        buttonVariants({ variant: 'outline' }),
        card,
        'flex-col items-center justify-center gap-2 text-muted-foreground',
      ]}>
      {#if uploading}
        <Loader />
      {:else}
        <ImageUp class="size-6" />
      {/if}
      <span class={['text-xs', uploading && 'hidden']}>{$dict.editor.upload}</span>
    </List.Option>

    {#each options as id, index (id)}
      {@const vt =
        id === picture
          ? 'view-transition-name: adventure-cover; view-transition-class: transition-morph;'
          : ''}
      <List.Option class={card} index={index + UPLOAD}>
        <Picture adventure={{ title: id, picture: id }} class="size-full object-cover" style={vt} />
      </List.Option>
    {/each}
  </List.Root>
</div>
