<script lang="ts">
  import { ImageUp } from '@lucide/svelte'
  import { Picture } from '@/media/ui'
  import { List } from '@/app/ui'
  import { buttonVariants } from '$ui/button'
  import { styles } from '$lib/tools'
  import { dict } from '$lib/intl'
  import { Loader } from '$com/loader'
  import type { Props } from './Gallery'

  let {
    picture = $bindable(''),
    active = true,
    presets,
    upload,
    variant,
    densities,
    card,
    placement = 'end',
    vt,
    gate,
    onpick,
  }: Props = $props()

  const baseCard = 'overflow-hidden rounded-lg max-w-64 shrink-0'
  const scrollVT = styles(`gallery-scroll-${crypto.randomUUID()}`, 'transition-instant')

  let input = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)
  // svelte-ignore state_referenced_locally
  let uploaded = $state<string | null>(picture && !presets.includes(picture) ? picture : null)

  const options = $derived(
    uploaded ? (placement === 'start' ? [uploaded, ...presets] : [...presets, uploaded]) : presets,
  )
  const offset = $derived(placement === 'start' ? 1 : 0)

  const picked = $derived.by(() => {
    if (!active) return undefined

    const i = options.indexOf(picture)

    return i >= 0 ? i + offset : undefined
  })

  function pick(index: number) {
    const run = () => {
      picture = options[index - offset]
      onpick?.(picture)
    }

    if (gate) gate(`paywall-${index - offset}`, run)
    else run()
  }

  function browse() {
    const run = () => input?.click()

    if (gate) gate('paywall-upload', run)
    else run()
  }

  async function handle(event: Event) {
    const target = event.target as HTMLInputElement

    if (!target.files?.length) return

    uploading = true

    const entry = await upload(target.files[0])

    uploading = false
    target.value = ''

    if (entry instanceof Error) return

    uploaded = entry.id
    picture = entry.id
    onpick?.(entry.id)
  }
</script>

<input type="file" accept="image/*" bind:this={input} onchange={handle} class="hidden" />

<List.Root {picked} onpick={pick} align="center" class="py-1 -my-1" style={$scrollVT}>
  {#if placement === 'start'}{@render uploader()}{/if}

  {#each options as id, i (id)}
    <List.Option
      id={gate ? `paywall-${i}` : undefined}
      class={[baseCard, card]}
      index={i + offset}
      style={vt && id === picture
        ? `view-transition-name: ${vt}; view-transition-class: transition-morph;`
        : undefined}>
      <Picture {id} alt={id} {variant} {densities} class="size-full object-cover" />
    </List.Option>
  {/each}

  {#if placement === 'end'}{@render uploader()}{/if}
</List.Root>

{#snippet uploader()}
  <List.Option
    id={gate ? 'paywall-upload' : undefined}
    onclick={browse}
    disabled={uploading}
    class={[
      buttonVariants({ variant: 'outline' }),
      'flex-col items-center justify-center gap-2 text-muted-foreground',
      baseCard,
      card,
    ]}>
    {#if uploading}
      <Loader />
    {:else}
      <ImageUp class="size-6" />
    {/if}
    <span class={['text-xs', uploading && 'hidden']}>{$dict.actions.upload}</span>
  </List.Option>
{/snippet}
