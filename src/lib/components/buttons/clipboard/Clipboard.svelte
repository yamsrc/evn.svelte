<script lang="ts">
  import { Check, Copy } from '@lucide/svelte'
  import { Spinner } from '$ui/spinner'
  import { Button } from '$ui/button'
  import { cn } from '$lib/utils'
  import { browser } from '$app/environment'
  import type { Props, Retriever } from './Clipboard'

  const { text, label, disabled, oncopy, class: classes, ...rest }: Props = $props()

  let copied = $state(false)
  let waiting = $state(false)

  const unavailable = browser && !navigator.clipboard

  async function onclick() {
    if (copied) return

    waiting = true

    if (typeof ClipboardItem === 'undefined') {
      const value = typeof text === 'function' ? await text() : text

      if (value === null) return

      await navigator.clipboard!.writeText(value)
    } else {
      const item = clipboard(text)

      await navigator.clipboard!.write([item])
    }

    waiting = false
    copied = true
    oncopy?.()
    setTimeout(() => (copied = false), 2000)
  }

  function clipboard(text: Retriever) {
    return typeof text === 'function'
      ? resolve(text as () => Promise<string | null>)
      : new ClipboardItem({ 'text/plain': new Blob([text], { type: 'text/plain' }) })
  }

  function resolve(text: () => Promise<string | null>) {
    return new ClipboardItem({
      'text/plain': text().then((value) => new Blob([value ?? ''], { type: 'text/plain' })),
    })
  }
</script>

<Button class={cn(classes)} {onclick} disabled={disabled || unavailable || waiting} {...rest}>
  {#if copied}
    <Check class="text-constructive" strokeWidth={3} />
  {:else if waiting}
    <Spinner />
  {:else}
    <Copy />
  {/if}
  {#if label !== null}{label}{/if}
</Button>
