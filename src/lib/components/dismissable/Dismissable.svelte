<script lang="ts">
  import { onMount } from 'svelte'
  import type { Props } from './Dismissable'

  const { dismissable = true, children, ondismiss }: Props = $props()

  const ANIMATION_DURATION_MS = 300

  let container: HTMLDivElement | undefined = $state()
  let sentinel: HTMLDivElement | undefined = $state()
  let dismissed = $state(false)
  let dismissing = $state(false)

  export async function dismiss() {
    if (dismissed) return

    dismissing = true
    dismissed = true

    await new Promise((resolve) => setTimeout(resolve, ANIMATION_DURATION_MS))
    await ondismiss?.()
  }

  export async function remove() {
    if (dismissed) return

    dismissing = true
    dismissed = true

    await new Promise((resolve) => setTimeout(resolve, ANIMATION_DURATION_MS))
  }

  onMount(() => {
    if (!sentinel || dismissed || !ondismiss) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry?.isIntersecting && !dismissed) {
          dismissed = true
          void ondismiss()
        }
      },
      { root: container, threshold: 1 },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  })
</script>

<div class="relative" class:dismissing>
  <div
    bind:this={container}
    class={['flex w-full', dismissable && 'overflow-x-auto snap-x snap-mandatory no-scrollbar']}>
    <div class="w-full shrink-0 snap-center">
      {@render children()}
    </div>
    <div bind:this={sentinel} class={['w-full shrink-0 snap-center', !dismissable && 'hidden']}>
    </div>
  </div>
</div>

<style>
  .dismissing {
    animation: slide-out-left 0.3s ease-out forwards;
  }

  @keyframes slide-out-left {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(-100%);
      opacity: 0;
    }
  }
</style>
