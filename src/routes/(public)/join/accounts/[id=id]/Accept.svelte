<script lang="ts">
  import { authenticated, account as iam, logout } from '@/iam'
  import { Cosmetics } from '@/accounts/ui'
  import { codes } from '@/accounts'
  import { Button, buttonVariants } from '$ui/button'
  import * as AlertDialog from '$ui/alert-dialog'
  import { cn } from '$lib/utils'
  import { dict } from '$lib/intl/join'
  import { goto } from '$app/navigation'
  import type { Props } from './Accept'

  let { account, code, accepted = $bindable(false), error = $bindable(false) }: Props = $props()

  let open = $state(true)

  async function onclick() {
    open = false

    logout()

    const ok = await codes.verify(account.id, code)

    if (ok !== true) error = true
    else accepted = true
  }
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Content escapeKeydownBehavior="ignore">
    <AlertDialog.Header>
      <AlertDialog.Title>
        <h2>{$dict.account.title}</h2>
      </AlertDialog.Title>
      <AlertDialog.Description>
        <p class="text-balance!">
          {$dict.account.description}
        </p>
      </AlertDialog.Description>
    </AlertDialog.Header>
    <div class="text-center">
      <Cosmetics {account} editable={false} />
      {#if $authenticated}
        <p>{$dict.account.conflict.content0($iam?.name)}</p>
        <p>{$dict.account.conflict.content1}</p>
      {:else}
        <p>{$dict.account.content0}</p>
      {/if}
    </div>
    <AlertDialog.Footer class="flex-row">
      <AlertDialog.Cancel
        class={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'flex-1')}
        onclick={() => goto('/')}
      >
        {$dict.actions.discard}
      </AlertDialog.Cancel>
      <Button id="join-accounts-accept-button" size="lg" class="flex-1" {onclick}>
        {#if $authenticated}
          {$dict.account.switch}
        {:else}
          {$dict.account.accept}
        {/if}
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
