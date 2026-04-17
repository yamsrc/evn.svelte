<script lang="ts">
  import { having } from 'svas'
  import { account, named } from '@/iam'
  import { add } from '@/contacts'
  import { Avatar } from '@/accounts/ui'
  import { Button, buttonVariants } from '$ui/button'
  import * as AlertDialog from '$ui/alert-dialog'
  import { cn } from '$lib/utils'
  import { dict } from '$lib/intl/join'
  import { goto } from '$app/navigation'
  import type { Props } from './Accept'

  let { inviter, accepted = $bindable(false), error = $bindable(false) }: Props = $props()

  let open = $state(true)

  async function onclick() {
    open = false

    await having(account)
    await named()

    const res = await add({ with: inviter.id })

    if (res instanceof Error) error = true
    else accepted = true
  }
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Content escapeKeydownBehavior="ignore">
    <AlertDialog.Header>
      <AlertDialog.Title>
        <h2>{$dict.friends.dialog.title}</h2>
      </AlertDialog.Title>
      <AlertDialog.Description>
        {$dict.friends.dialog.description}
      </AlertDialog.Description>
    </AlertDialog.Header>
    <div class="flex flex-row gap-4 p-4 rounded-md bg-muted justify-center items-center">
      <Avatar account={inviter} size={40} />
      <p class="text-balance">
        {$dict.friends.dialog.content(inviter.name)}
      </p>
    </div>
    <AlertDialog.Footer class="flex-row">
      <AlertDialog.Cancel
        class={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'flex-1')}
        onclick={() => goto('/')}>
        {$dict.friends.dialog.decline}
      </AlertDialog.Cancel>
      <Button id="join-friends-accept-button" size="lg" class="flex-1" {onclick}>
        {$dict.friends.dialog.accept}
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
