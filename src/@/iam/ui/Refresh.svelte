<script lang="ts">
  import { onMount } from 'svelte'
  import { LogOut } from '@lucide/svelte'
  import { dict } from '@/iam/ui/intl'
  import { logout, type Method } from '@/iam'
  import { Button } from '$ui/button'
  import { Refresh as PasswordRefresh } from './password'
  import { Refresh as PasskeyRefresh } from './passkey'
  import { Refresh as OIDCRefresh } from './oidc'
  import Card from './Card.svelte'
  import type { AccountLike } from './AccountLike'

  const { account, method }: { account: AccountLike; method: Method | null } = $props()

  onMount(() => {
    if (method === null) logout()
  })
</script>

<div class="flex flex-col items-center gap-4 w-full">
  <Card title={$dict.auth.refresh.title} description={$dict.auth.refresh.description(account.name)}>
    {#snippet action()}
      {#if method === 'passkey'}
        <PasskeyRefresh {account} />
      {:else if method === 'password'}
        <PasswordRefresh />
      {:else if method === 'apple'}
        <OIDCRefresh idp="apple" />
      {:else if method === 'google'}
        <OIDCRefresh idp="google" />
      {/if}
    {/snippet}
  </Card>

  <Button variant="outline" onclick={logout}>
    <LogOut />
    {$dict.auth.signout}
  </Button>
</div>
