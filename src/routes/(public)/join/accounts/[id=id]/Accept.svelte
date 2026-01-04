<script lang="ts">
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl/join'
  import { cn } from '$lib/utils'
  import * as AlertDialog from '$ui/alert-dialog'
  import { Button, buttonVariants } from '$ui/button'
  import { codes } from '@/accounts'
  import { Cosmetics } from '@/accounts/ui'
  import { authenticated, account as iam, logout } from '@/iam'
  import type { Props } from './Accept'

  const { account, code }: Props = $props()

  let open = $state(true)
  let error = $state(false)

  async function onclick() {
    open = false

    logout()

    const ok = await codes.verify(account.id, code)

    if (ok !== true) {
      error = true
      open = true
    }
  }
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Content class={cn(error && 'border-destructive')}>
    <AlertDialog.Header>
      <AlertDialog.Title
        ><h2>
          {#if error}
            {$dict.account.expired.title}
          {:else}
            {$dict.account.title}
          {/if}
        </h2>
      </AlertDialog.Title>
      <AlertDialog.Description>
        <p class="text-balance!">
          {#if error}
            {$dict.account.expired.description}
          {:else}
            {$dict.account.description}
          {/if}
        </p>
      </AlertDialog.Description>
    </AlertDialog.Header>
    <div class="text-center">
      {#if error}
        <p>{$dict.account.expired.content}</p>
      {:else}
        <Cosmetics {account} editable={false} />
        {#if $authenticated}
          <p>{$dict.account.conflict.content0($iam?.name)}</p>
          <p>{$dict.account.conflict.content1}</p>
        {:else}
          <p>{$dict.account.content0}</p>
        {/if}
      {/if}
    </div>
    <AlertDialog.Footer class={cn(error || 'flex-row [&>button]:w-1/2')}>
      {#if error}
        <AlertDialog.Cancel
          class={buttonVariants({ size: 'lg', variant: 'secondary' })}
          onclick={() => goto('/')}
        >
          {$dict.actions.close}
        </AlertDialog.Cancel>
      {:else}
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
      {/if}
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
