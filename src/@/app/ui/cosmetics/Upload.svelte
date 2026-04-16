<script lang="ts">
  import { Spinner } from '$ui/spinner'
  import type { Props } from './Upload'

  const { onupload, disabled = false, class: classes, children }: Props = $props()

  let input = $state<HTMLInputElement | null>(null)
  let uploading = $state(false)

  async function onchange(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]

    target.value = ''

    if (!file) return

    uploading = true
    await onupload(file)
    uploading = false
  }
</script>

<button
  type="button"
  {disabled}
  onclick={() => input?.click()}
  class={['relative', !disabled && 'hover:cursor-pointer', classes]}>
  {@render children()}
  {#if uploading}
    <Spinner class="absolute inset-e-0 bottom-0 text-muted-foreground" />
  {/if}
</button>
{#if !disabled}
  <input bind:this={input} type="file" accept="image/*" hidden {onchange} />
{/if}
