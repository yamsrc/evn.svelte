<script lang="ts">
  import { Async, ok } from 'svas'
  import { page } from '$app/state'
  import { groups } from '@/groups'
  import { Editor } from '@/groups/ui'
  import { account } from '@/iam'

  const { children } = $props()
  const id = $derived(page.params.id)
  const value = $derived.by(() => {
    if (ok($account)) return { identities: [$account.id] }
  })
</script>

{#if id === undefined}
  <Editor.Context {value}>
    {@render children()}
  </Editor.Context>
{:else}
  <Async store={groups}>
    {#snippet awaited(groups)}
      {#if ok(groups)}
        {@const group = groups.find((entry) => entry.id === id)}
        {#if group}
          {#key id}
            <Editor.Context {id} value={group}>
              {@render children()}
            </Editor.Context>
          {/key}
        {/if}
      {/if}
    {/snippet}
  </Async>
{/if}
