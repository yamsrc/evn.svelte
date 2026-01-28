<script lang="ts">
  import { Dismissable } from '@/app/ui'
  import { del } from '@/notifications'
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
    await del(notification.id)
  }

  export function dismiss() {
    return dismissable?.dismiss()
  }

  export function remove() {
    return dismissable?.remove()
  }
</script>

<Dismissable bind:this={dismissable} {ondismiss}>
  <div
    class={[
      'w-full shrink-0 snap-center ',
      'bg-accent border border-muted-foreground/20 rounded-lg',
      'text-sm font-normal',
      classes,
    ]}>
    <Component {notification} />
  </div>
</Dismissable>
