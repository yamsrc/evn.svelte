<script lang="ts">
  import { ok } from 'svas'
  import { page } from '$app/state'
  import { Screen } from '@/app/ui'
  import Accept from './Accept.svelte'
  import type { PageData } from './$types'

  const data = page.data as PageData
  const account = data.account
  const code = page.url.searchParams.get('code')
</script>

<Screen>
  <h1>Hello World</h1>
  <p>{page.data.account?.name} {code}</p>
</Screen>

{#if ok(account) && code !== null}
  <Accept {account} {code} />
{/if}
