<script lang="ts">
  import { Share2 } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { cn } from '$lib/utils'
  import { Loader } from '$com/loader'
  import { Clipboard } from '$com/buttons'
  import { browser } from '$app/environment'
  import type { Props, Retriever } from './Share'

  const { children, data, label, disabled, onshare, class: classes, ...rest }: Props = $props()

  let waiting = $state(false)

  const supported = !browser || navigator.share !== undefined

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

  async function text() {
    const share = typeof data === 'function' ? await get(data) : data

    if (share === null) return null

    return share.url ?? null
  }
</script>

{#if supported}
  <Button class={cn(classes)} {onclick} disabled={waiting || disabled} {...rest}>
    {#if children}
      {@render children?.()}
    {:else}
      {#if waiting}
        <Loader />
      {:else}
        <Share2 />
      {/if}
      {#if label !== undefined}{label}{/if}
    {/if}
  </Button>
{:else}
  <Clipboard {text} {label} {disabled} class={classes} oncopy={onshare} {...rest as any} />
{/if}
