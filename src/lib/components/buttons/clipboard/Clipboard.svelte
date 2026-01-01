<script lang="ts">
  import { Check, Copy } from '@lucide/svelte'
  import { browser } from '$app/environment'
  import { cn } from '$lib/utils'
  import { Button } from '$ui/button'
  import { Spinner } from '$ui/spinner'
  import type { Props } from './Clipboard'

  const {
    text,
    labeled,
    variant = 'outline',
    disabled,
    oncopy,
    class: classes,
    ...rest
  }: Props = $props()

  let copied = $state(false)
  let waiting = $state(false)

  const unavailable = browser && !navigator.clipboard

  async function onclick() {
    if (copied) return

    waiting = true

    if (typeof ClipboardItem === 'undefined') {
      const value = typeof text === 'function' ? await text() : text

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

  function clipboard(text: string | (() => Promise<string>)) {
    return typeof text === 'function'
      ? resolve(text)
      : new ClipboardItem({ 'text/plain': new Blob([text], { type: 'text/plain' }) })
  }

  function resolve(text: () => Promise<string>) {
    return new ClipboardItem({
      'text/plain': text().then((value) => new Blob([value], { type: 'text/plain' })),
    })
  }
</script>

<Button
  class={cn(classes)}
  {variant}
  {onclick}
  disabled={unavailable || waiting || disabled}
  {...rest}
>
  {#if copied}
    <Check class="text-green-400" />
    {#if labeled}Copied!{/if}
  {:else}
    {#if waiting}
      <Spinner />
    {:else}
      <Copy />
    {/if}
    {#if labeled}Copy{/if}
  {/if}
</Button>
