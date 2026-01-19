<script lang="ts">
  import { ok } from 'svas'
  import { page } from '$app/state'
  import { Screen, Authenticated, Goto } from '@/app/ui'
  import Accept from './Accept.svelte'
  import type { PageData } from './$types.js'

  const data = page.data as PageData
  const group = data.group
  const good = ok(group)

  let accepted = $state(false)
  let error = $state(!good)
</script>

{#if error}
  <Goto href="/" />
{:else if good}
  <Screen>
    <Authenticated>
      {#if accepted}
        <Goto href="/" />
      {/if}
    </Authenticated>
  </Screen>
  <Accept {group} bind:accepted bind:error />
{/if}
