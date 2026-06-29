<script lang="ts">
  import { X } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { transit } from '$lib/tools/transition'
  import { Overlay } from '$com/fullscreen'
  import type { Props } from './Fullscreen'

  let {
    open = $bindable(false),
    children,
    content,
    overlay,
    class: classes,
    onshow,
    onhide,
    x = true,
    fragile = false,
    controlled = false,
  }: Props = $props()

  export function show() {
    onshow?.()
    transit(() => (open = true))
  }

  export function hide() {
    transit(() => (open = false)).then(() => onhide?.())
  }

  function onkeydown(e: KeyboardEvent) {
    if (controlled || !open || e.key !== 'Escape') return

    e.preventDefault()
    hide()
  }

  function onkeyactivate(e: KeyboardEvent) {
    if (e.key !== 'Enter' && e.key !== ' ') return

    e.preventDefault()
    hide()
  }

  function portal(node: HTMLElement) {
    document.body.appendChild(node)

    return { destroy: () => node.remove() }
  }
</script>

<svelte:window {onkeydown} />

<div
  use:portal
  role="button"
  tabindex="0"
  data-overlay
  data-slot="fullscreen-container"
  onclick={fragile && !controlled ? hide : undefined}
  onkeydown={fragile && !controlled ? onkeyactivate : undefined}
  class={[
    'fixed inset-0 z-1001 flex items-center justify-center bg-background/90',
    open || 'hidden',
  ]}
  style="view-transition-name: fullscreen;">
  {#if content}
    {@render content(open)}
  {:else}
    {@render children()}
  {/if}
  {#if overlay}
    <Overlay>
      {@render overlay()}
    </Overlay>
  {/if}
  {#if x}
    <Button
      variant="ghost"
      size="icon"
      class="absolute top-4 inset-e-4 tim:top-[env(safe-area-inset-top)]"
      onclick={hide}>
      <X />
    </Button>
  {/if}
</div>

{#if controlled}
  {@render children()}
{:else}
  <button
    class={['focus:outline-none **:data-[slot=fullscreen-overlay]:hidden', classes]}
    onclick={show}>
    {@render children()}
  </button>
{/if}

<style>
  ::view-transition-group(fullscreen) {
    z-index: 2;
  }

  ::view-transition-group(.fullscreen-content) {
    z-index: 3;
  }
</style>
