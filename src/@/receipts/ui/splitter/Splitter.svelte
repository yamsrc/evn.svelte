<script lang="ts">
  import { onMount } from 'svelte'
  import { track } from '@vercel/analytics'
  import { ChartPie } from '@lucide/svelte'
  import { Asyvatar } from '@/accounts/ui'
  import { Button } from '$ui/button'
  import { dict } from '../intl'
  import Failed from '../Failed.svelte'
  import { sync, store } from './store'
  import Summary from './Summary.svelte'
  import Progress from './Progress.svelte'
  import { statistics } from './Progress'
  import Pending from './Pending.svelte'
  import Participants from './Participants.svelte'
  import Lock from './Lock.svelte'
  import { allDone } from './Lock'
  import Items from './Items.svelte'
  import Feedback from './Feedback.svelte'
  import Extras from './Extras.svelte'
  import Autoclose from './Autoclose.svelte'
  import Actions from './Actions.svelte'
  import type { Props } from './Splitter'

  let { receipt, account, actor = $bindable(account.id) }: Props = $props()

  const stats = $derived(statistics($store))

  export function leave() {
    return participants?.remove()
  }

  let participants = $state<Participants | undefined>(undefined)

  onMount(() => track('Receipts.Splitter'))

  $effect(() => {
    sync(receipt)

    if (!receipt.identities.includes(actor)) actor = account.id
  })
</script>

<div class="space-y-2">
  {#if receipt.status !== 'failed'}
    <div class={['z-10 sticky top-4 tim:top-[env(safe-area-inset-top)]', 'space-y-2']}>
      <Progress />
      <Participants bind:this={participants} {receipt} {stats} {account} bind:actor />
    </div>
  {/if}
  {#if receipt.status === 'pending'}
    <Pending />
  {:else if receipt.status === 'failed'}
    <Failed />
  {:else if receipt.done[actor] === true}
    <div class="space-y-4 pt-2">
      <div>
        <Summary {receipt} {stats} {actor} />
        {#if receipt.extras.length > 0}
          <Extras {receipt} />
        {/if}
      </div>
      {#if !receipt.locked}
        {#if allDone(receipt)}
          <Lock {receipt} {stats} />
        {:else}
          <Button variant="outline" size="lg" disabled class="w-full">
            {$dict.splitter.waiting}
          </Button>
          <Autoclose {receipt} {actor} payer={receipt.autolock} />
        {/if}
        <Feedback {receipt} {account} />
      {:else if receipt.locker === account.id}
        <Lock {receipt} {stats} />
      {:else if receipt.status === 'sealed'}
        {@const expense = receipt.links?.find((l) => l.type === 'expense')}
        {#if expense}
          <div class="flex justify-center">
            <Button variant="outline" size="icon" href={`/expenses/${expense.id}/`}>
              <ChartPie />
            </Button>
          </div>
        {/if}
      {:else if receipt.locker}
        <div class="flex justify-center">
          <Asyvatar identity={receipt.locker} class="animate-pulse" />
        </div>
      {/if}
    </div>
  {:else}
    <Items {receipt} {actor} />
  {/if}
</div>

{#if receipt.status !== 'failed'}
  <Actions {receipt} {account} bind:actor />
{/if}
