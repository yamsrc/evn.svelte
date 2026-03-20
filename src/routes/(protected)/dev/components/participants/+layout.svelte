<script lang="ts">
  import { ok } from 'svas'
  import { account } from '@/iam'
  import { page } from '$app/state'
  import Context from './Context.svelte'

  const { children } = $props()

  const value = $derived.by(() => {
    if (!ok($account)) return { identities: page.state.participants?.identities ?? [] }

    const identities = [$account.id]

    if (!page.state.participants?.identities) return { identities }

    return {
      identities: Array.from(new Set([...page.state.participants?.identities, ...identities])),
    }
  })
</script>

<Context {value}>
  {@render children()}
</Context>
