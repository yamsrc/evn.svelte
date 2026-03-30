<script lang="ts">
  import { ArrowRight, CircleSmall } from '@lucide/svelte'
  import { Action } from '@/app/ui'
  import { allDone, type Props } from './Lock'

  const { receipt, actor }: Props = $props()
  const done = $derived(allDone(receipt))
</script>

<Action disabled={!done} variant={done ? 'default' : 'secondary'}>
  {#if done}
    <ArrowRight />
  {:else}
    <CircleSmall class="text-warning animate-pulse" fill="currentColor" />
  {/if}
</Action>
