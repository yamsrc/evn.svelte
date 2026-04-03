<script lang="ts">
  import { transit } from '$lib/tools/transition'
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

  function portal(node: HTMLElement) {
    document.body.appendChild(node)

    return { destroy: () => node.remove() }
  }
</script>

<svelte:window {onkeydown} />

{#if open}
  <div
    use:portal
    role="button"
    tabindex="0"
    onpointerdown={hide}
    class="fixed inset-0 z-1001 flex items-center justify-center bg-background pointer-events-auto">
    {@render children()}
    {#if overlay}
      <Overlay>
        {@render overlay()}
      </Overlay>
    {/if}
  </div>
{:else}
  <button
    class={['focus:outline-none **:data-[slot=fullscreen-overlay]:hidden', classes]}
    onclick={show}>
    {@render children()}
  </button>
{/if}
