<script lang="ts">
  import { Plus } from '@lucide/svelte'
  import { onMount } from 'svelte'
  import { Actions } from '$com/shell'
  import { dict } from '$lib/intl'
  import { transit } from '$lib/tools/svt'
  import { Button } from '$ui/button'
  import { actionVariants } from './Action'
  import { actions } from './Actions'

  let open = $state(false)
  let popupRef = $state<HTMLDivElement | undefined>()

  function onclick() {
    transit(() => (open = true))
  }

  onMount(() => {
    function handle(e: MouseEvent) {
      if (!open) return

      const trigger = document.getElementById('nav-actions-button')
      const target = e.target as Node

      if (trigger?.contains(target) || popupRef?.contains(target)) return

      transit(() => (open = false))
    }

    document.addEventListener('click', handle)

    return () => document.removeEventListener('click', handle)
  })
</script>

{#snippet separator(text: string)}
  <div class="flex items-center justify-stretch gap-1">
    <div class="bg-border my-1 h-px w-3.5"></div>
    <span class="text-muted-foreground text-xs font-bold">{text}</span>
    <div class="bg-border my-1 h-px w-full"></div>
  </div>
{/snippet}

<Actions>
  <div class="flex-1 h-full aspect-square" style="anchor-name: --nav-actions-button;">
    {#if !open}
      <Button
        id="nav-actions-button"
        class={actionVariants()}
        style="view-transition-name: action-dropdown-menu;"
        {onclick}>
        <Plus />
      </Button>
    {/if}
  </div>
  {#snippet additional()}
    {#if open}
      <div
        bind:this={popupRef}
        class={[
          'additional fixed z-1001 flex flex-col',
          'bg-popover border border-border text-popover-foreground rounded-lg',
          'p-1 px-0.5 pt-2',
        ]}>
        {#each actions($dict) as group (group.name)}
          <div class="w-full flex flex-col gap-1">
            {@render separator(group.name)}
            <div class="w-full flex flex-col items-start gap-1">
              {#each group.items as item (item.name)}
                <Button
                  id={item.id}
                  onclick={item.onSelect}
                  variant="ghost"
                  class="text-base font-normal px-3.5 has-[>svg]:px-3.5 py-2.5">
                  <item.icon size={16} class="text-foreground" />
                  {item.name}
                </Button>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {/snippet}
</Actions>

<style>
  .additional {
    position-anchor: --nav-actions-button;
    position-area: span-x-start span-top;
    position-try-fallbacks: span-x-end span-top;

    view-transition-name: action-dropdown-menu;
  }

  ::view-transition-group(action-dropdown-menu) {
    animation-duration: 300ms;
    animation-timing-function: cubic-bezier(0.2, 1.4, 0.4, 1);
  }
</style>
