<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
  import Button from '$ui/button/button.svelte'
  import { Picture, url } from '@/media/ui'
  import type { Props } from './Attachments'

  let { attachments = $bindable([]), editable = true }: Props = $props()

  function filter(id: string) {
    attachments = attachments.filter((attachment) => attachment !== id)
  }

  const path = '/expenses/attachments/'
</script>

{#if attachments.length > 0}
  <div
    class="bg-accent flex justify-center p-4 overflow-x-auto overscroll-x-contain no-scrollbar">
    <div class="flex gap-3">
      {#each attachments as attachment (attachment)}
        <div
          class={[
            'shrink-0 border h-[300px] no-scrollbar rounded-md',
            editable && 'overflow-y-auto overscroll-y-contain snap-y snap-mandatory',
          ]}>
          <a href={url({ id: attachment, path })} target="_blank">
            <Picture
              id={attachment}
              {path}
              variant="300x600?"
              class={['block h-full', editable && 'snap-center']} />
          </a>
          {#if editable}
            <div class="snap-center flex justify-center items-center bg-destructive p-4">
              <Button
                variant="ghost"
                size="icon-lg"
                onclick={() => filter(attachment)}
                class="w-full">
                <Trash2 />
              </Button>
            </div>
          {/if}
        </div>
      {/each}
      <div class="w-2 shrink-0"></div>
    </div>
  </div>
{/if}
