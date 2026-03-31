<script lang="ts">
  import { transit } from '$lib/tools/svt'
  import { Overlay } from '$com/fullscreen'
  import type { Props } from './Fullscreen'

  let { open = $bindable(false), children, overlay, class: classes }: Props = $props()

  export function show() {
    transit(() => (open = true))
  }

  export function hide() {
    transit(() => (open = false))
  }

  function onkeydown(e: KeyboardEvent) {
    if (!open || e.key !== 'Escape') return

    e.preventDefault()
    hide()
  }
</script>

<svelte:window {onkeydown} />

{#if open}
  <div
    role="button"
    tabindex="0"
    onpointerdown={hide}
    class="fixed inset-0 z-1001 flex items-center justify-center bg-background">
    {@render children()}
    {#if overlay}
      <Overlay>
        {@render overlay()}
      </Overlay>
    {/if}
  </div>
{:else}
  <button class={['focus:outline-none **:data-[slot=overlay]:hidden', classes]} onclick={show}>
    {@render children()}
  </button>
{/if}
