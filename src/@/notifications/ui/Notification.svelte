<script lang="ts">
  import { Dismissable } from '@/app/ui'
  import { del } from '@/notifications'
  import type { Props } from './Notification'

  const { notification, component: Component }: Props = $props()

  let dismissable:
    | { dismiss: () => Promise<void> | void; remove: () => Promise<void> | void }
    | undefined = $state()

  async function ondismiss() {
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
  <div class="w-full shrink-0 snap-center bg-accent rounded-lg text-sm font-normal">
    <Component {notification} />
  </div>
</Dismissable>
