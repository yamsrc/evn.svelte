<script lang="ts">
  import { having } from 'svas'
  import { invitations } from '@/receipts'
  import { account, named } from '@/iam'
  import * as Card from '@/expenses/ui/views/card'
  import { Attachments } from '@/expenses/ui'
  import { Avatars } from '@/app/ui'
  import { Picture } from '@/accounts/ui'
  import { Button, buttonVariants } from '$ui/button'
  import * as AlertDialog from '$ui/alert-dialog'
  import { date } from '$lib/tools'
  import { dict, locale } from '$lib/intl/join'
  import { Separator } from '$com/separator'
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

  const description = $derived(
    `${date(receipt.date, $locale)}${receipt.merchant.location ? `, ${receipt.merchant.location}` : ''}`,
  )
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

    <Attachments attachments={receipt.attachments} path="/receipts/attachments/" class="-mx-6" />

    <Card.Root>
      <Card.Row align="start">
        <Card.Side class="flex-1">
          <div class="flex items-center gap-1">
            {#if receipt.title}
              <span>{receipt.title}</span>
            {/if}
          </div>
          <p class="text-sm text-muted-foreground">{description}</p>
        </Card.Side>
        <Card.Metric amount={receipt.total} label={$dict.receipts.dialog.balance.total} />
      </Card.Row>
      <Separator />
      <Card.Row>
        <Card.Side class="flex-1">
          <Avatars identities={receipt.identities} max={5} class="flex-1 justify-start" />
        </Card.Side>
      </Card.Row>
    </Card.Root>

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
