<script lang="ts">
  import { ScanText } from '@lucide/svelte'
  import { upload } from '@/receipts'
  import { Button } from '$ui/button'
  import { styles } from '$lib/tools'
  import { dict } from '$lib/intl/dev'
  import { Fullscreen } from '$com/fullscreen'
  import type { Props } from './Button'

  const { ...props }: Props = $props()

  let fullscreen = $state<Fullscreen | null>(null)
  let input = $state<HTMLInputElement | null>(null)
  let file = $state<File | undefined>()

  function onclick() {
    input?.click()
  }

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement

    file = target.files?.[0]

    if (file === undefined) return

    fullscreen?.show()
    void upload(file)
  }

  const style = styles('receipt', 'transition-spring transition-morph')
</script>

<Fullscreen bind:this={fullscreen} controlled>
  <Button {onclick} {...props} style={$style}>
    <ScanText />
    <span>{$dict.components.receipts.upload.label}</span>
    <input bind:this={input} type="file" class="sr-only" {oninput} accept="image/*" />
  </Button>
  {#snippet content()}
    <div class="p-4 border rounded-lg">
      {#if file}
        <img
          src={URL.createObjectURL(file)}
          alt="Receipt"
          style={$style}
          class="rounded-lg max-h-[50vh]" />
      {/if}
      <Button onclick={() => fullscreen?.hide()}>Close</Button>
    </div>
  {/snippet}
</Fullscreen>
