<script lang="ts">
  import { having } from 'svas'
  import { Receipt } from '@lucide/svelte'
  import { invitations } from '@/receipts'
  import { account, named } from '@/iam'
  import { Avatars } from '@/app/ui'
  import { Picture } from '@/accounts/ui'
  import { Button, buttonVariants } from '$ui/button'
  import * as AlertDialog from '$ui/alert-dialog'
  import { dict } from '$lib/intl/join'
  import { goto } from '$app/navigation'
  import type { Props } from './Accept'

  let { receipt, inviter, accepted = $bindable(false), error = $bindable(false) }: Props = $props()

  let open = $state(true)

  async function onclick() {
    open = false

    await having(account)
    await named()

    const res = await invitations.accept(receipt.id)

    if (res instanceof Error) error = true
    else accepted = true
  }
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Content escapeKeydownBehavior="ignore">
    <AlertDialog.Header>
      <AlertDialog.Title>
        <h2>{$dict.receipts.dialog.title}</h2>
      </AlertDialog.Title>
      <AlertDialog.Description />
    </AlertDialog.Header>

    {#if inviter}
      <div class="flex flex-col items-center gap-3">
        <Picture account={inviter} class="size-24" />
        <p class="text-center text-muted-foreground">
          {$dict.receipts.dialog.description(inviter.name, inviter.grammar)}
        </p>
      </div>
    {/if}

    <div class="flex flex-col items-start gap-2 rounded-lg border border-border bg-card px-4 py-2">
      <div class="flex items-center gap-2">
        <Receipt class="size-4" />
        <span class="font-bold">{receipt.title}</span>
      </div>
      <Avatars identities={receipt.identities} max={7} />
    </div>
    <AlertDialog.Footer class="flex-row">
      <AlertDialog.Cancel
        class={[buttonVariants({ size: 'lg', variant: 'secondary' }), 'flex-1']}
        onclick={() => goto('/')}>
        {$dict.receipts.dialog.decline}
      </AlertDialog.Cancel>
      <Button id="join-receipt-accept-button" size="lg" class="flex-1" {onclick}>
        {$dict.receipts.dialog.join}
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
