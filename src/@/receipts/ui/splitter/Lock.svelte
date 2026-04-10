<script lang="ts">
  import { ArrowRight } from '@lucide/svelte'
  import { Spinner } from '$ui/spinner'
  import { Button } from '$ui/button'
  import { transition } from '$lib/tools'
  import { Hold } from '$com/buttons'
  import { goto } from '$app/navigation'
  import { dict } from '../intl'
  import { store } from './store'
  import { stats } from './Progress'
  import { convert, type Props } from './Lock'

  const { receipt }: Props = $props()
  const { claimed, total } = $derived(stats($store))

  let busy = $state(false)

  async function onclick() {
    busy = true

    const expense = convert(receipt, $store)

    await new Promise((resolve) => setTimeout(resolve, 500))

    await goto('/expenses/editor/', { state: { expense } })

    // const locked = await lock(receipt.id)

    // if (locked instanceof Error) busy = false
  }
</script>

{#snippet icon()}
  {#if busy}
    <Spinner />
  {:else}
    <ArrowRight />
  {/if}
{/snippet}

<div class="flex flex-col justify-center gap-2" use:transition={{ name: 'splitter-lock-button' }}>
  {#if claimed < total}
    <Hold
      variant="default"
      size="lg"
      {onclick}
      position="top"
      align="center"
      disabled={busy}
      label={$dict.unassigned(total - claimed)}>
      {$dict.close.label}
      {@render icon()}
      {#snippet message()}
        <p>Hold to continue</p>
        <p class="flex justify-center items-center gap-1">
          {$dict.unassigned(total - claimed)}
        </p>
      {/snippet}
    </Hold>
  {:else}
    <Button size="lg" {onclick} disabled={busy}>
      {$dict.close.label}
      {@render icon()}
    </Button>
  {/if}
</div>
