<script lang="ts">
  import { ImageUp } from '@lucide/svelte'
  import { Picture } from '@/media/ui'
  import { buttonVariants } from '$ui/button'
  import { takeoff } from '$lib/tools'
  import { dict } from '$lib/intl'
  import { Loader } from '$com/loader'
  import * as List from '../list'
  import type { Props } from './Gallery'

  let {
    picture = $bindable(''),
    presets,
    upload,
    variant,
    card,
    placement = 'end',
    vt,
    gate,
    onpick,
  }: Props = $props()

  const baseCard = 'overflow-hidden rounded-lg max-w-64 shrink-0'

  let input = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)
  // svelte-ignore state_referenced_locally
  let uploaded = $state<string | null>(picture && !presets.includes(picture) ? picture : null)

  const options = $derived(
    uploaded ? (placement === 'start' ? [uploaded, ...presets] : [...presets, uploaded]) : presets,
  )
  const offset = $derived(placement === 'start' ? 1 : 0)
  const picked = $derived.by(() => {
    const i = options.indexOf(picture)

    return i >= 0 ? i + offset : undefined
  })

  function guarded(run: () => void) {
    if (gate) gate(run)
    else run()
  }

  function pick(index: number) {
    if (gate) takeoff(`paywall-${index - offset}`, 'paywall', 'transition-spring transition-morph')

    guarded(() => {
      picture = options[index - offset]
      onpick?.(picture)
    })
  }

  function browse() {
    if (gate) takeoff('paywall-upload', 'paywall', 'transition-spring transition-morph')

    guarded(() => input?.click())
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

<List.Root {picked} onpick={pick} align="center" class="py-1 -my-1">
  {#if placement === 'start'}{@render uploader()}{/if}

  {#each options as id, i (id)}
    <List.Option
      id={gate ? `paywall-${i}` : undefined}
      class={[baseCard, card]}
      index={i + offset}
      style={vt && id === picture
        ? `view-transition-name: ${vt}; view-transition-class: transition-morph;`
        : undefined}>
      <Picture {id} alt={id} {variant} class="size-full object-cover" />
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
