<script lang="ts">
  import { ArrowRight, TriangleAlert } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { transition } from '$lib/tools'
  import { dict } from '../intl'
  import { store } from './store'
  import { stats } from './Progress'
  import type { Props } from './Lock'

  const { receipt, actor }: Props = $props()
  const { claimed, total } = $derived(stats($store))

  function onclick(e: MouseEvent) {
    const button = e.target as HTMLButtonElement

    button.disabled = true

    console.debug('onclick', receipt.id, actor)
  }
</script>

<div class="flex flex-col justify-center gap-2" use:transition={{ name: 'splitter-lock-button' }}>
  <Button size="lg" {onclick}>
    {$dict.close.label}
    <ArrowRight />
  </Button>
  {#if claimed < total}
    <p class="text-muted-foreground flex justify-center items-center gap-1">
      <TriangleAlert size={16} />
      {$dict.unassigned(total - claimed)}
    </p>
  {/if}
</div>
