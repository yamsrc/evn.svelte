<script lang="ts">
  import { ok } from 'svas'
  import { Screen, Authenticated, Goto } from '@/app/ui'
  import { oidc } from '$config/configuration'
  import { page } from '$app/state'
  import Accept from './Accept.svelte'
  import type { PageData } from './$types'

  const data = page.data as PageData
  const adventure = data.adventure
  const inviter = data.inviter
  const good = ok(adventure)

  let accepted = $state(false)
  let error = $state(!good)
</script>

{#if error}
  <Goto href="/" />
{:else if good}
  <Screen>
    <Authenticated {oidc}>
      {#if accepted}
        <Goto href={accepted ? `/adventures/${adventure.id}/` : '/'} />
      {/if}
    </Authenticated>
  </Screen>
  <Accept {adventure} {inviter} bind:accepted bind:error />
{/if}
