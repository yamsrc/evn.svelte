<script lang="ts">
  import type { Props } from './Notification'

  const { notification, component: Component, ondismiss }: Props = $props()

  let container: HTMLDivElement | undefined = $state()
  let hasDismissed = $state(false)

  function handleScrollEnd() {
    if (!container || hasDismissed) return

    const maxLeft = container.scrollWidth - container.clientWidth

    if (container.scrollLeft >= maxLeft - 1) {
      hasDismissed = true
      ondismiss?.(notification.id)
    }
  }
</script>

<div class="relative">
  <div
    bind:this={container}
    class="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
    onscrollend={handleScrollEnd}>
    <div class="w-full px-4 shrink-0">
      <div class="w-full shrink-0 snap-center bg-accent rounded-lg p-4">
        <Component {notification} />
      </div>
    </div>
    <div class="w-full shrink-0 snap-center"></div>
  </div>
</div>
