<script lang="ts">
  import { Dismissable } from '@/app/ui'
  import { del } from '@/notifications'
  import type { Props } from './Notification'

  const { notification, component: Component }: Props = $props()

  let dismissable: { dismiss: () => Promise<void> | void } | undefined = $state()

  async function handleDismiss() {
    await del(notification.id)
  }

  export function dismiss() {
    return dismissable?.dismiss()
  }
</script>

<Dismissable bind:this={dismissable} ondismiss={handleDismiss}>
  <div class="w-full shrink-0 snap-center bg-accent rounded-lg text-sm font-normal">
    <Component {notification} />
  </div>
</Dismissable>
