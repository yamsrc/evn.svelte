<script lang="ts">
  import { del } from '../svc'
  import Notification from './Notification.svelte'
  import type { Props } from './Notifications'

  const { notifications, limit = 5 }: Props = $props()

  async function ondismiss(id: string) {
    await del(id)
  }
</script>

<div class="flex flex-col gap-2">
  {#if notifications.length > 0}
    <div class="flex flex-col gap-2">
      {#each notifications.slice(0, limit) as notification (notification.id)}
        <Notification {notification} {ondismiss} />
      {/each}
    </div>
  {/if}
</div>
