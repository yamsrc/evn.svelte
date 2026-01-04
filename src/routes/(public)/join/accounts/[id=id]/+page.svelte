<script lang="ts">
  import { ok } from 'svas'
  import { page } from '$app/state'
  import { Screen, Authenticated } from '@/app/ui'
  import Accept from './Accept.svelte'
  import Expired from './Expired.svelte'
  import type { PageData } from './$types'

  const data = page.data as PageData
  const account = data.account
  const code = page.url.searchParams.get('code')
  const good = ok(account) && code !== null

  let error = $state(!good)
</script>

{#if error}
  <Expired />
{:else if good}
  <Screen>
    <Authenticated {account}>
      <h1>Hello World</h1>
      <p>{account.name} {code}</p>
    </Authenticated>
  </Screen>
  <Accept {account} {code} bind:error />
{/if}
