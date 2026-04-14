<script lang="ts">
  import { ThumbsDown, ThumbsUp } from '@lucide/svelte'
  import { rate } from '@/receipts'
  import { ButtonGroup } from '$ui/button-group'
  import { Button } from '$ui/button'
  import { transit, transition } from '$lib/tools'
  import { dict } from '../intl'
  import type { Props } from './Feedback'

  const options = [ThumbsDown, ThumbsUp] as const
  const { receipt, account }: Props = $props()

  let value = $derived<boolean | undefined>(receipt.good?.[account.id])
  let busy = $state(false)

  async function onclick(e: MouseEvent) {
    const button = e.target as HTMLButtonElement
    const good = Number(button.dataset.value) === 1

    busy = true

    transit(() => (value = good))
    await rate(receipt.id, good)
    busy = false
  }
</script>

<div
  class="flex flex-col items-center justify-center space-y-2"
  use:transition={{ name: 'splitter-feedback' }}>
  <span class="text-muted-foreground">
    {#if value === undefined}
      {$dict.feedback.question}
    {:else}
      {#if value === false}
        {$dict.feedback.down}
      {/if}
      <span style="view-transition-name: splitter-feedback-thanks;">{$dict.feedback.thanks}</span>
    {/if}
  </span>
  <ButtonGroup>
    {#each options as Icon, i (i)}
      <Button
        data-value={i}
        {onclick}
        disabled={busy}
        size="icon"
        variant={value === (i === 1) ? 'default' : 'outline'}
        class={['w-18', value === (i === 1) && 'pointer-events-none']}>
        <Icon />
      </Button>
    {/each}
  </ButtonGroup>
</div>
