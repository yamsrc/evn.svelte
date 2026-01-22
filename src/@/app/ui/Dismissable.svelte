<script lang="ts">
  import type { Props } from './Dismissable'

  const { children, ondismiss }: Props = $props()

  const ANIMATION_DURATION_MS = 300

  let container: HTMLDivElement | undefined = $state()
  let dismissed = $state(false)
  let dismissing = $state(false)

  export async function dismiss() {
    if (dismissed || !ondismiss) return

    dismissing = true
    dismissed = true

    await new Promise((resolve) => setTimeout(resolve, ANIMATION_DURATION_MS))
    await ondismiss()
  }

  async function onscrollend() {
    if (!container || dismissed || !ondismiss) return

    const width = container.scrollWidth - container.clientWidth
    const gone = container.scrollLeft >= width

    if (gone) {
      dismissed = true
      await ondismiss()
    }
  }
</script>

<div class="relative" class:dismissing>
  <div
    bind:this={container}
    class="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
    {onscrollend}>
    <div class="w-full shrink-0 px-5 snap-center">
      {@render children()}
    </div>
    <div class="w-full shrink-0 snap-center"></div>
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
