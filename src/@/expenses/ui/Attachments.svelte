<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
  import { Picture } from '@/media/ui'
  import { Fullscreen } from '$com/fullscreen'
  import { Hold } from '$com/buttons'
  import { dict } from './intl'
  import type { Props } from './Attachments'

  let {
    attachments = $bindable([]),
    path = '/expenses/attachments/',
    editable,
    class: classes,
  }: Props = $props()

  let zoomed = $state<string | null>(null)

  function filter(id: string) {
    attachments = attachments.filter((attachment) => attachment !== id)
  }

  function onshow(id: string) {
    zoomed = id
  }
</script>

<div
  class={[
    'bg-accent flex justify-center p-4 overflow-x-auto overscroll-x-contain touch-pan-x no-scrollbar',
    classes,
  ]}>
  <div class="flex gap-3 h-[300px]">
    {#each attachments as attachment (attachment)}
      <div
        class={[
          'shrink-0 border h-full no-scrollbar',
          editable && 'overflow-y-auto overscroll-y-contain touch-pan-y snap-y snap-mandatory',
        ]}>
        <Fullscreen class="h-[300px]" fragile onshow={() => onshow(attachment)}>
          <Picture
            id={attachment}
            {path}
            variant="300x600?"
            class={['w-full max-h-full object-contain rounded-md', editable && 'snap-center']}
            style={`${zoomed === attachment ? `view-transition-name: attachment-${attachment};` : ''} view-transition-class: transition-spring transition-morph;`} />
          {#snippet overlay()}
            {#if editable}
              <div class="px-5 pt-2 tim:pt-[env(safe-area-inset-top)] flex justify-end">
                <Hold
                  label={$dict.actions.delete}
                  variant="outline"
                  size="icon"
                  class="text-destructive"
                  onclick={() => filter(attachment)}>
                  <Trash2 class="size-5" />
                </Hold>
              </div>
            {/if}
          {/snippet}
        </Fullscreen>
      </div>
    {/each}
    <div class="w-2 shrink-0"></div>
  </div>
</div>
