<script lang="ts">
  import { transit } from '$lib/tools'
  import { Button } from '$ui/button'
  import { permission, request, dismissed } from '@/transmission'
  import { dict } from './intl'
  import type { Props } from './Permission'

  const { class: classes }: Props = $props()

  const DELAY = 7 * 24 * 60 * 60 * 1000
  const hidden = $derived(Date.now() - $dismissed! < DELAY)

  let dismissing = $state(false)

  function dismiss() {
    transit(() => (dismissing = true))
    setTimeout(() => dismissed.set(Date.now()), 3000)
  }
</script>

{#if $permission === 'default' && !hidden}
  <div
    class={[
      'w-full',
      'bg-muted border border-muted-foreground/20 rounded-lg',
      'p-4 flex flex-col gap-3 h-fit',
      classes,
    ]}
    style="view-transition-name: transmission-nudge;">
    {#if dismissing}
      <p class="text-sm">{$dict.permission.dismissed}</p>
    {:else}
      <p class="text-sm">{$dict.permission.prompt}</p>
      <div class="flex gap-2">
        <Button class="w-fit" onclick={request}>
          {$dict.permission.button}
        </Button>
        <Button variant="secondary" onclick={dismiss}>
          {$dict.permission.dismiss}
        </Button>
      </div>
    {/if}
  </div>
{/if}
