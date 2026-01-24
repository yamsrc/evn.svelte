<script lang="ts">
  import { ArrowLeftRight, ArrowRight, ArrowLeft } from '@lucide/svelte'
  import { ok } from 'svas'
  import { grammar } from '$lib/intl'
  import { transit } from '$lib/tools'
  import * as AlertDialog from '$ui/alert-dialog'
  import { Button } from '$ui/button'
  import { Avatar } from '@/accounts/ui'
  import { Action, Coins, CoinsInput } from '@/app/ui'
  import { dict } from './intl'
  import type { Props } from './Transfer'
  import type { Account } from '@/accounts'

  const { account, contact }: Props = $props()

  let open = $state(false)
  let receive = $derived(contact.balance > 0)
  let value = $derived(Math.abs(contact.balance))

  const tobe = $derived(contact.balance + value * (receive ? -1 : 1))

  function onclick() {
    open = true
  }

  function swap() {
    transit(() => (receive = !receive))
  }
</script>

<Action id="nav-action-transfer" variant="secondary" {onclick}>
  <ArrowLeftRight />
  <span>{$dict.transfer.action}</span>
</Action>

{#snippet avatar(account: Account, classes = '')}
  <div class={['flex items-center gap-2', classes]}>
    <Avatar {account} />
    <span class="text-sm">{account.name}</span>
  </div>
{/snippet}

{#if contact.account && ok(contact.account)}
  <AlertDialog.Root bind:open>
    <AlertDialog.Content class="pt-4" interactOutsideBehavior="close">
      <AlertDialog.Header>
        <AlertDialog.Title>
          <h1>{$dict.transfer.dialog.title}</h1>
        </AlertDialog.Title>
      </AlertDialog.Header>
      <div>
        <div class="flex items-center gap-2 mb-4">
          <div class="flex-1 min-w-0 flex">
            {@render avatar(contact.account)}
          </div>
          <div class="shrink-0 flex items-center">
            <Button variant="outline" size="icon" onclick={swap}>
              {#if receive}
                <ArrowRight />
              {:else}
                <ArrowLeft />
              {/if}
            </Button>
          </div>
          <div class="flex-1 min-w-0 flex justify-end">
            <div class="flex items-center gap-2">
              <span class="text-sm">{$dict.transfer.me}</span>
              <Avatar {account} />
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-2">
          <div class="text-nowrap">
            {#if receive}
              {$dict.transfer.direction.tome($grammar)}
            {:else}
              {$dict.transfer.direction.byme($grammar)}
            {/if}
          </div>
          <CoinsInput bind:value class="max-w-1/2" inputClass="text-3xl font-bold" />
        </div>
      </div>
      <AlertDialog.Footer class="flex-row [&_button]:flex-1">
        <Button variant="secondary" size="lg" onclick={() => (open = false)}>
          {$dict.transfer.dialog.cancel}
        </Button>
        <Button size="lg">
          {$dict.transfer.dialog.action}
        </Button>
      </AlertDialog.Footer>
      <p class="flex gap-1 items-center justify-center text-muted-foreground">
        {#if tobe === 0}
          {$dict.transfers.tobe.neutral}
        {:else}
          {#if tobe > 0}
            {$dict.transfers.tobe.positive}
          {:else}
            {$dict.transfers.tobe.negative}
          {/if}
          <Coins amount={tobe} />
        {/if}
      </p>
    </AlertDialog.Content>
  </AlertDialog.Root>
{/if}
