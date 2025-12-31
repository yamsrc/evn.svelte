<script lang="ts">
  import { Share2 } from '@lucide/svelte'
  import { browser } from '$app/environment'
  import { Loader } from '$com/loader'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import type { Props, Retriever } from './Share'

  const {
    children,
    data,
    label,
    variant,
    disabled,
    onshare,
    class: classes,
    ...rest
  }: Props = $props()

  let waiting = $state(false)

  const unavailable = browser && !navigator.share

  async function onclick() {
    const share = typeof data === 'function' ? await get(data) : data

    if (share === null) return

    await navigator.share(share)
    onshare?.()
  }

  async function get(fn: Retriever) {
    waiting = true

    const value = await fn()

    waiting = false

    return value
  }
</script>

<Button
  class={cn(classes)}
  {variant}
  {onclick}
  disabled={unavailable || waiting || disabled}
  {...rest}
>
  {#if children}
    {@render children?.()}
  {:else}
    {#if waiting}
      <Loader />
    {:else}
      <Share2 />
    {/if}
    {#if label !== null}{label}{/if}
  {/if}
</Button>
