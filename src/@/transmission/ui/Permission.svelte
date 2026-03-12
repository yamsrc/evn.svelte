<script lang="ts">
  import { permission, request, dismissed } from '@/transmission'
  import { Panel } from '@/app/ui'
  import { Button } from '$ui/button'
  import { transit } from '$lib/tools'
  import { dict } from './intl'
  import type { Props } from './Permission'

  const { class: classes, name = 'transmission-permission', dismissable = false }: Props = $props()

  const DELAY = 7 * 24 * 60 * 60 * 1000

  const hidden = $derived(
    dismissable && ($permission !== 'default' || Date.now() - $dismissed! < DELAY),
  )

  let dismissing = $state(false)

  function later() {
    transit(() => (dismissing = true))
  }

  function dismiss() {
    transit(() => dismissed.set(Date.now()))
  }

  function subscribe() {
    void transit(request)
  }
</script>

{#if !hidden}
  <Panel
    {name}
    class={[
      'w-full h-fit p-4 flex flex-col gap-3',
      'bg-muted border border-muted-foreground/20 rounded-lg',
      classes,
    ]}>
    {#if dismissing}
      <p>{$dict.permission.dismissed}</p>
      <Button class="w-fit" onclick={dismiss}>{$dict.permission.dismiss}</Button>
    {:else}
      <p>{$dict.permission.prompt}</p>
      <p class="text-sm text-muted-foreground">{$dict.permission.comment}</p>
      <div class="flex gap-2">
        <Button class="w-fit" onclick={subscribe}>
          {$dict.permission.button}
        </Button>
        {#if dismissable}
          <Button variant="ghost" onclick={later}>
            {$dict.permission.later}
          </Button>
        {/if}
      </div>
    {/if}
  </Panel>
{/if}
