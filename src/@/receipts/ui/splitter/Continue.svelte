<script lang="ts">
  import { ArrowRight } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { dict } from '../intl'
  import type { Props } from './Continue'

  const { receipt }: Props = $props()

  function onclick() {
    console.debug('onclick', receipt.id)
  }
</script>

<Button size="lg" {onclick}>
  {$dict.close.label}
  <ArrowRight />
</Button>
