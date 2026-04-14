<script lang="ts">
  import { ok } from 'svas'
  import { account as iam } from '@/iam'
  import { Screen, Authenticated, Goto } from '@/app/ui'
  import { oidc } from '$config/configuration'
  import { page } from '$app/state'
  import Expired from './Expired.svelte'
  import Accept from './Accept.svelte'
  import type { PageData } from './$types'

  const data = page.data as PageData
  const account = data.account
  const code = page.url.searchParams.get('code')
  const good = ok(account) && code !== null

  let accepted = $state(false)
  let error = $state(!good)
</script>

{#if error}
  <Expired />
{:else if good}
  <Screen>
    <Authenticated {account} {oidc}>
      {#if accepted || $iam?.id === account.id}
        <Goto href="/" />
      {/if}
    </Authenticated>
  </Screen>
  <Accept {account} {code} bind:accepted bind:error />
{/if}
