<script lang="ts">
  import { LogOut } from '@lucide/svelte'
  import { onMount } from 'svelte'
  import { Button } from '$ui/button'
  import * as Card from '$ui/card'
  import { logout, type Method } from '@/iam'
  import { Refresh as OIDCRefresh } from './oidc'
  import { Refresh as PasskeyRefresh } from './passkey'
  import { Refresh as PasswordRefresh } from './password'
  import type { AccountLike } from './AccountLike'

  const { account, method }: { account: AccountLike; method: Method | null } = $props()

  onMount(() => {
    if (method === null) logout()
  })
</script>

<div class="flex flex-col items-center gap-4 w-full">
  <Card.Root class="w-full">
    <Card.Header>
      <Card.Title>Welcome back</Card.Title>
      <Card.Description>
        {#if account.name}
          {account.name}, for
        {:else}
          For
        {/if}
        security reasons, your credentials have expired. Please log&nbsp;in again to&nbsp;continue.
      </Card.Description>
    </Card.Header>
    <Card.Content class="flex justify-center">
      {#if method === 'passkey'}
        <PasskeyRefresh {account} />
      {:else if method === 'password'}
        <PasswordRefresh />
      {:else if method === 'apple'}
        <OIDCRefresh idp="apple" />
      {:else if method === 'google'}
        <OIDCRefresh idp="google" />
      {/if}
    </Card.Content>
  </Card.Root>

  <Button variant="outline" onclick={logout}>
    <LogOut />
    Sign out
  </Button>
</div>
