<script lang="ts">
  import { ThumbsDown, ThumbsUp } from '@lucide/svelte'
  import { ButtonGroup } from '$ui/button-group'
  import { Button } from '$ui/button'
  import { transit, transition } from '$lib/tools'
  import { dict } from '../intl'
  import type { Props } from './Feedback'

  const options = [ThumbsDown, ThumbsUp] as const
  const { actor }: Props = $props()

  let value = $state<number>(-1)

  function onclick(e: MouseEvent) {
    const button = e.target as HTMLButtonElement
    const i = Number(button.dataset.value)

    if (Number.isNaN(i)) throw new Error('Invalid value')

    button.disabled = true

    transit(() => (value = i))
    void actor // replace with api call
    button.disabled = false
  }
</script>

<div
  class="flex flex-col items-center justify-center space-y-2"
  use:transition={{ name: 'splitter-feedback' }}>
  <span class="text-muted-foreground">
    {#if value === -1}
      {$dict.feedback.question}
    {:else}
      {#if value === 0}
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
        size="icon"
        variant={value === i ? 'default' : 'outline'}
        class={['w-18', value === i && 'pointer-events-none']}>
        <Icon />
      </Button>
    {/each}
  </ButtonGroup>
</div>
