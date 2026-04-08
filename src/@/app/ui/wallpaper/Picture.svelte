<script lang="ts">
  import { ImageUp } from '@lucide/svelte'
  import { paywall } from '@/purchases/ui'
  import { Picture } from '@/media/ui'
  import { account } from '@/iam'
  import { wallpaper } from '@/app/svc'
  import { buttonVariants } from '$ui/button'
  import { transit } from '$lib/tools'
  import { dict } from '$lib/intl'
  import * as Picker from '$com/picker'
  import { Loader } from '$com/loader'

  const { presets } = wallpaper

  let input = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)

  const current = $derived($account?.wallpaper?.picture)
  const uploaded = $derived(current && !presets.includes(current) ? current : null)

  const options = $derived(uploaded ? [...presets, uploaded] : presets)
  const picked = $derived(current ? options.indexOf(current) : undefined)

  const card =
    'aspect-1/2 overflow-hidden rounded-xl w-[calc((100%-var(--spacing)*2)/2)] max-w-64 shrink-0'

  function premium(callback: () => void) {
    return paywall({
      benefit: 'background',
      label: $dict.profile.background.cta,
      icon: ImageUp,
      callback,
    })
  }

  function onpick(index: number) {
    const id = options[index]

    if (!id) return

    void premium(() => transit(() => void wallpaper.set({ method: 'picture', picture: id })))
  }

  function onupload() {
    void premium(() => input?.click())
  }

  async function handleUpload(event: Event) {
    const target = event.target as HTMLInputElement

    if (!target.files?.length) return

    uploading = true

    await wallpaper.upload(target.files[0])

    uploading = false

    target.value = ''
  }
</script>

<input type="file" accept="image/*" bind:this={input} onchange={handleUpload} class="hidden" />

<Picker.Root {picked} {onpick} align="center" class="gap-2 py-1 -my-1" bleed>
  {#each options as id, index (id)}
    <Picker.Option class={card} {index}>
      <Picture {id} alt="" variant="1280x2700" densities={[1]} class="size-full object-cover" />
    </Picker.Option>
  {/each}

  <Picker.Option
    onclick={onupload}
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
    <span class={['text-xs', uploading && 'hidden']}>{$dict.profile.background.upload}</span>
  </Picker.Option>
</Picker.Root>
