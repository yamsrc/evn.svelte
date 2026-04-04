<script lang="ts">
  import { onMount } from 'svelte'
  import { once } from 'svas'
  import { Attachments } from '@/receipts/ui'
  import { progress, type Created } from '@/receipts'
  import { Section } from '@/app/ui'
  import { Goto } from '@/app/ui'
  import { Spinner } from '$ui/spinner'
  import { dict } from '$lib/intl/dev'
  import { goto } from '$app/navigation'

  onMount(async () => {
    await once(progress, ($progress) => $progress?.status === 'created')

    const created = $progress as Created

    void goto(`../${created.receipt}/`)
  })
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
      <Spinner />
    </div>
    <div>
      <p class="text-center">
        {#if $progress.status === 'uploading' || $progress.status === 'creating'}
          {$dict.components.receipts.progress.uploading.title}
        {/if}
      </p>
      {#if $progress.status === 'uploading'}
        <p class="text-center text-sm text-muted-foreground">
          {$dict.components.receipts.progress.uploading.comment}
        </p>
      {/if}
    </div>
  {/if}
</Section>
