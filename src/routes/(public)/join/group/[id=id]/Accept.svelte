<script lang="ts">
  import { having } from 'svas'
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl/join'
  import { cn } from '$lib/utils'
  import * as AlertDialog from '$ui/alert-dialog'
  import { Button, buttonVariants } from '$ui/button'
  import { invitations } from '@/groups'
  import { Panel } from '@/groups/ui'
  import { account } from '@/iam'
  import type { Props } from './Accept'

  let { group, accepted = $bindable(false), error = $bindable(false) }: Props = $props()

  let open = $state(true)

  async function onclick() {
    open = false

    await having(account)

    const res = await invitations.accept(group.id)

    if (res instanceof Error) error = true
    else accepted = true
  }
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Content escapeKeydownBehavior="ignore">
    <AlertDialog.Header>
      <AlertDialog.Title>
        <h2>{$dict.group.dialog.title(group.name)}</h2>
      </AlertDialog.Title>
      <AlertDialog.Description />
    </AlertDialog.Header>
    <Panel {group} />
    <AlertDialog.Footer class="flex-row">
      <AlertDialog.Cancel
        class={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'flex-1')}
        onclick={() => goto('/')}>
        {$dict.group.dialog.decline}
      </AlertDialog.Cancel>
      <Button id="join-group-accept-button" size="lg" class="flex-1" {onclick}>
        {$dict.group.dialog.join}
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
