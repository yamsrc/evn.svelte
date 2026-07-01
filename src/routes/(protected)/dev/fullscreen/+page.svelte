<script lang="ts">
  import { Async } from 'svas'
  import { Trash } from '@lucide/svelte'
  import { Picture } from '@/media/ui'
  import { expenses } from '@/expenses'
  import { dict } from '$lib/intl/dev'
  import { Zoom } from '$com/zoom'
  import { Fullscreen } from '$com/fullscreen'
  import { Hold } from '$com/buttons'

  let fullscreen = $state<Fullscreen | null>(null)
</script>

<div class="flex items-center justify-center">
  <Async store={expenses}>
    {#snippet awaited(expenses)}
      {@const attachment = expenses.find((e) => e.attachments.length > 0)?.attachments[0]}
      {#if attachment}
        <Fullscreen bind:this={fullscreen} class="ring-2 ring-ring/20 max-w-40" fragile x={false}>
          {@render picture()}
          {#snippet content(open)}
            <Zoom {open}>{@render picture()}</Zoom>
          {/snippet}
          {#snippet overlay()}
            <div class="p-4 tim:pt-[env(safe-area-inset-top)] flex justify-end">
              <Hold
                label={$dict.components.fullscreen.delete}
                variant="outline"
                size="icon"
                class="text-destructive"
                onclick={() => fullscreen?.hide()}>
                <Trash />
              </Hold>
            </div>
          {/snippet}
        </Fullscreen>
        {#snippet picture()}
          <Picture
            id={attachment}
            variant="1200x?"
            path="/expenses/attachments/"
            class="w-full max-h-full object-contain rounded-lg"
            style="view-transition-name: attachment-{attachment}; view-transition-class: transition-spring transition-morph;" />
        {/snippet}
      {:else}
        <p>{$dict.components.fullscreen.attachment}</p>
      {/if}
    {/snippet}
  </Async>
</div>
