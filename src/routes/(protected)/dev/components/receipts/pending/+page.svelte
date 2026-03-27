<script lang="ts">
  import { Check } from '@lucide/svelte'
  import { Attachments } from '@/receipts/ui'
  import { progress } from '@/receipts'
  import { Section } from '@/app/ui'
  import { Goto } from '@/app/ui'
  import { Spinner } from '$ui/spinner'
  import { Button } from '$ui/button'
  import { dict } from '$lib/intl/dev'
</script>

<Section class="space-y-4">
  {#if $progress === null}
    <Goto href=".." />
  {:else}
    {@const attachments =
      $progress.status === 'uploading' || $progress.status === 'creating'
        ? undefined
        : [$progress.picture]}
    <Attachments {attachments} class="rounded-md overflow-clip" />
    <div class="flex justify-center items-center">
      {#if $progress.status === 'ready'}
        <Check class="size-4 text-constructive" />
      {:else}
        <Spinner />
      {/if}
    </div>
    <div>
      <p class="text-center">
        {#if $progress.status === 'uploading' || $progress.status === 'creating'}
          {$dict.components.receipts.progress.uploading.title}
        {:else if $progress.status === 'processing'}
          {$dict.components.receipts.progress.processing.title}
        {:else if $progress.status === 'ready'}
          {$dict.components.receipts.progress.ready.title}
        {/if}
      </p>
      {#if $progress.status === 'uploading'}
        <p class="text-center text-sm text-muted-foreground">
          {$dict.components.receipts.progress.uploading.comment}
        </p>
      {/if}
      {#if $progress.status === 'processing'}
        <p class="text-center text-sm text-muted-foreground">
          {$dict.components.receipts.progress.processing.comment}
        </p>
      {/if}
      {#if $progress.status === 'ready'}
        <p class="text-center text-sm text-muted-foreground">
          {$dict.components.receipts.progress.ready.comment(Date.now() - $progress.since)}
        </p>
      {/if}
    </div>
    {#if $progress.status === 'ready'}
      <div class="flex justify-center items-center">
        <Button href={`../${$progress.receipt}/`}>{$dict.actions.continue}</Button>
      </div>
    {/if}
  {/if}
</Section>
