<script lang="ts">
  import { Picture, url } from '@/media/ui'
  import type { Props } from './Attachments'

  const { attachments }: Props = $props()
  const path = '/expenses/attachments/'
</script>

{#if attachments.length > 0}
  <div class="flex flex-wrap gap-2 px-4 justify-center">
    {#each attachments as attachment (attachment)}
      <a href={url({ id: attachment, path })} target="_blank">
        <Picture id={attachment} {path} variant="200x400?" class="rounded-lg border h-[200px]" />
      </a>
    {/each}
  </div>
{/if}
