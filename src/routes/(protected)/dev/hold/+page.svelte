<script lang="ts">
  import { LogOut } from '@lucide/svelte'
  import { dict } from '$lib/intl'
  import { Hold } from '$com/buttons/hold'

  // prettier-ignore
  const positions = [
    'right', 'bottom', 'left',
    'right', 'top', 'left',
    'right', 'top', 'left',
  ] as const
</script>

<div class="flex-1 flex w-full p-5 relative">
  <div
    class="flex-1 w-full grid grid-cols-[auto_auto_auto] grid-rows-[auto_auto_auto] auto-cols-auto auto-rows-auto content-between justify-between"
  >
    {#each positions as position, i (i)}
      <div class="w-fit h-fit">
        <Hold
          name={`hold-${crypto.randomUUID()}`}
          variant="ghost"
          class="size-12 bg-accent/50 border border-border"
          {position}
          label={$dict.actions.holdToLogout}
        >
          <LogOut class="size-5" />
        </Hold>
      </div>
    {/each}
  </div>
</div>
