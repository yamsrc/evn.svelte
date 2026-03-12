<script lang="ts">
  import { del } from '@/notifications'
  import { transit } from '$lib/tools/svt'
  import { Dismissable } from '$com/dismissable'
  import type { Props } from './Notification'

  const {
    notification,
    component: Component,
    ondismiss: ondismissCb,
    class: classes,
  }: Props = $props()

  let dismissable:
    | { dismiss: () => Promise<void> | void; remove: () => Promise<void> | void }
    | undefined = $state()

  async function ondismiss() {
    ondismissCb?.(notification.id)
    await transit(() => del(notification.id))
  }

  export function dismiss() {
    return dismissable?.dismiss()
  }

  export function remove() {
    return dismissable?.remove()
  }
</script>

<Dismissable bind:this={dismissable} {ondismiss}>
  <div class="px-5">
    <div
      class={[
        'w-full shrink-0 snap-center',
        'bg-muted border border-muted-foreground/20 rounded-lg',
        'text-sm font-normal',
        classes,
      ]}>
      <Component {notification} />
    </div>
  </div>
</Dismissable>
