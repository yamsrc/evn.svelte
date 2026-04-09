<script lang="ts">
  import { ok } from 'svas'
  import { internal as receipts } from '@/receipts'
  import { Spinner } from '$ui/spinner'
  import { dict } from './intl'
  import Failed from './Failed.svelte'
  import type { Props } from './Progress'

  const { file, progress, style, oncomplete, onretry }: Props = $props()

  let failed = $state(false)

  $effect(() => {
    if (progress.status === 'created' && ok($receipts)) {
      const receipt = $receipts.find((r) => r.id === progress.receipt)

      if (receipt !== undefined)
        if (receipt.status === 'success') oncomplete?.(receipt.id)
        else if (receipt.status === 'failed') failed = true
    } else if (progress.status === 'failed') failed = true
  })

  export function clear() {
    failed = false
  }
</script>

<div class="space-y-6 w-full max-w-md mx-auto p-4">
  {#if failed}
    <Failed {onretry} />
  {:else}
    {#if file}
      <img
        src={URL.createObjectURL(file)}
        alt="Receipt"
        {style}
        class="rounded-lg max-h-[60vh] mx-auto" />
    {/if}
    <div class="flex flex-col items-center gap-2 text-muted-foreground">
      <Spinner />
      <p>
        {#if progress.status === 'uploading'}
          {$dict.state.uploading}
        {:else}
          {$dict.state.processing}
        {/if}
      </p>
    </div>
  {/if}
</div>
