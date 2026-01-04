<script lang="ts">
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl/join'
  import * as AlertDialog from '$ui/alert-dialog'
  import { Button, buttonVariants } from '$ui/button'
  import { codes } from '@/accounts'
  import { Cosmetics } from '@/accounts/ui'
  import { authenticated, account as iam, logout } from '@/iam'
  import type { Props } from './Accept'

  let { account, code, error = $bindable(false) }: Props = $props()

  let open = $state(true)

  async function onclick() {
    open = false

    logout()

    const ok = await codes.verify(account.id, code)

    if (ok !== true) error = true
  }
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Content>
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
    <AlertDialog.Footer class="flex-row [&>button]:w-1/2">
      <AlertDialog.Cancel
        class={buttonVariants({ size: 'lg', variant: 'secondary' })}
        onclick={() => goto('/')}
      >
        {$dict.actions.discard}
      </AlertDialog.Cancel>
      <Button id="join-accounts-accept-button" size="lg" {onclick}>
        {#if $authenticated}
          {$dict.account.switch}
        {:else}
          {$dict.account.accept}
        {/if}
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
