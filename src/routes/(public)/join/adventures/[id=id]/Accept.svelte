<script lang="ts">
  import { having } from 'svas'
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl/join'
  import { cn } from '$lib/utils'
  import * as AlertDialog from '$ui/alert-dialog'
  import { Button, buttonVariants } from '$ui/button'
  import { Picture } from '@/accounts/ui'
  import { invitations } from '@/adventures'
  import { Panel } from '@/adventures/ui'
  import { account, named } from '@/iam'
  import type { Props } from './Accept'

  let {
    adventure,
    inviter,
    accepted = $bindable(false),
    error = $bindable(false),
  }: Props = $props()

  let open = $state(true)

  async function onclick() {
    open = false

    await having(account)
    await named()

    const res = await invitations.accept(adventure.id)

    if (res instanceof Error) error = true
    else accepted = true
  }
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Content escapeKeydownBehavior="ignore">
    <AlertDialog.Header>
      <AlertDialog.Title>
        <h2>{$dict.adventures.dialog.heading}</h2>
      </AlertDialog.Title>
      <AlertDialog.Description />
    </AlertDialog.Header>

    {#if inviter}
      <div class="flex flex-col items-center gap-3">
        <Picture account={inviter} class="size-24" variant="96x96!" />
        <p class="text-center text-muted-foreground">
          {$dict.adventures.dialog.description(inviter.name, inviter.grammar)}
        </p>
      </div>
    {/if}

    <Panel {adventure} variant="470x100!" />

    <AlertDialog.Footer class="flex-row">
      <AlertDialog.Cancel
        class={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'flex-1')}
        onclick={() => goto('/')}>
        {$dict.adventures.dialog.decline}
      </AlertDialog.Cancel>
      <Button id="join-adventure-accept-button" size="lg" class="flex-1" {onclick}>
        {$dict.adventures.dialog.join}
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
