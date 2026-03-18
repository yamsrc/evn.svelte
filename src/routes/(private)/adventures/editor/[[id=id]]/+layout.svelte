<script lang="ts">
  import { Async, ok } from 'svas'
  import { page } from '$app/state'
  import { adventures } from '@/adventures'
  import { Editor } from '@/adventures/ui'
  import { account } from '@/iam'

  const { children } = $props()
  const id = $derived(page.params.id)
  const value = $derived.by(() => {
    if (ok($account)) return { participants: [$account.id] }
  })
</script>

{#if id === undefined}
  <Editor.Context {value}>
    {@render children()}
  </Editor.Context>
{:else}
  <Async store={adventures}>
    {#snippet awaited(adventures)}
      {#if ok(adventures)}
        {@const adventure = adventures.find((entry) => entry.id === id)}
        {#if adventure}
          {@const identities = Object.keys(adventure?.participants ?? {})}
          {@const value = { ...adventure, participants: identities }}
          {#key id}
            <Editor.Context {value}>
              {@render children()}
            </Editor.Context>
          {/key}
        {/if}
      {/if}
    {/snippet}
  </Async>
{/if}
