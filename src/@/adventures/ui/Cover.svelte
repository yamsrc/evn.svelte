<script lang="ts">
  import { ImageUp } from '@lucide/svelte'
  import { Loader } from '$com/loader'
  import * as Picker from '$com/picker'
  import { presets, upload } from '@/adventures'
  import { url } from '@/media/ui/Picture'
  import { dict } from './intl'
  import type { Props } from './Cover'

  const { picture, onchange }: Props = $props()

  let input = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)
  let uploaded = $state<string | null>(null)
  let scrolled = $state(false)

  // svelte-ignore state_referenced_locally
  const saved = !presets.includes(picture) && picture ? picture : null
  const custom = $derived(uploaded ?? saved)
  const all = $derived(custom ? [custom, ...presets] : presets)
  const current = $derived(picture)
  const picked = $derived(all.indexOf(current))
  const scroll = $derived(scrolled || picked > 0 ? picked : -1)
  const card = 'w-44 aspect-[17/12] shrink-0 overflow-hidden rounded-lg'

  function onpick(index: number) {
    scrolled = true
    onchange(all[index])
  }

  async function handleUpload(event: Event) {
    const target = event.target as HTMLInputElement

    if (!target.files?.length) return

    uploading = true

    const result = await upload(target.files[0])

    uploading = false
    target.value = ''

    if (result instanceof Error) return

    scrolled = true
    uploaded = result.id
    onchange(result.id)
  }
</script>

<div>
  <h2>{$dict.editor.cover}</h2>
  <input type="file" accept="image/*" bind:this={input} onchange={handleUpload} class="hidden" />

  <div class="-mx-5">
    {#key custom}
      <Picker.Root {picked} {scroll} {onpick} snap="center" class="gap-2 px-5 py-1">
        <Picker.Option
          id="adventures-cover-upload-button"
          pickable={false}
          variant="outline"
          onclick={() => input?.click()}
          disabled={uploading}
          class={[card, 'flex-col items-center justify-center gap-2 text-muted-foreground']}>
          {#if uploading}
            <Loader />
          {:else}
            <ImageUp class="size-6" />
          {/if}
          <span class={['text-xs', uploading && 'hidden']}>{$dict.editor.upload}</span>
        </Picker.Option>

        {#each all as id (id)}
          {@const cover = url({ id, path: '/pictures/', variant: '600x400!', format: 'webp' })}
          <Picker.Option
            class={[card, 'bg-cover bg-center']}
            style="background-image: url({cover})" />
        {/each}
      </Picker.Root>
    {/key}
  </div>
</div>
