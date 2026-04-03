<script lang="ts">
  import { ArrowRight } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { transition } from '$lib/tools'
  import { dict } from '../intl'
  import type { Props } from './Lock'

  const { receipt, actor }: Props = $props()

  function onclick(e: MouseEvent) {
    const button = e.target as HTMLButtonElement

    button.disabled = true

    console.debug('onclick', receipt.id, actor)
  }
</script>

<div class="flex justify-center" use:transition={{ name: 'splitter-lock-button' }}>
  <Button size="lg" class="w-full md:w-auto" {onclick}>
    {$dict.close.label}
    <ArrowRight />
  </Button>
</div>
