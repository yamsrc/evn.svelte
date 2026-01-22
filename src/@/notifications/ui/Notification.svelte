<script lang="ts">
  import { del } from '@/notifications'
  import type { Props } from './Notification'

  const { notification, component: Component }: Props = $props()

  let container: HTMLDivElement | undefined = $state()
  let hasDismissed = $state(false)
  let isAnimating = $state(false)

  export async function dismiss() {
    if (hasDismissed) return

    isAnimating = true
    hasDismissed = true

    await new Promise((resolve) => setTimeout(resolve, 300))
    await del(notification.id)
  }

  async function handleScrollEnd() {
    if (!container || hasDismissed) return

    const maxLeft = container.scrollWidth - container.clientWidth

    if (container.scrollLeft >= maxLeft - 1) {
      hasDismissed = true
      await del(notification.id)
    }
  }
</script>

<div class="relative" class:dismissed={isAnimating}>
  <div
    bind:this={container}
    class="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
    onscrollend={handleScrollEnd}>
    <div class="w-full px-4 shrink-0">
      <div class="w-full shrink-0 snap-center bg-accent rounded-lg text-sm font-normal">
        <Component {notification} />
      </div>
    </div>
    <div class="w-full shrink-0 snap-center"></div>
  </div>
</div>

<style>
  .dismissed {
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
