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

  function later() {
    transit(() => (dismissing = true))
  }

  function dismiss() {
    transit(() => dismissed.set(Date.now()))
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
      <p>{$dict.permission.dismissed}</p>
      <Button class="w-fit" onclick={dismiss}>{$dict.permission.dismiss}</Button>
    {:else}
      <p>{$dict.permission.prompt}</p>
      <p class="text-sm text-muted-foreground">{$dict.permission.comment}</p>
      <div class="flex gap-2">
        <Button class="w-fit" onclick={request}>
          {$dict.permission.button}
        </Button>
        <Button variant="secondary" onclick={later}>
          {$dict.permission.later}
        </Button>
      </div>
    {/if}
  </div>
{/if}
