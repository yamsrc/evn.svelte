<script lang="ts">
  import { Async } from 'svas'
  import { page } from '$app/state'
  import { NEWID } from '$lib/tools'
  import { expenses } from '@/expenses'
  import { Editor } from '@/expenses/ui'

  const { children } = $props()
  const id = $derived(page.params.id as string)
</script>

{#if id === NEWID}
  <Editor.Context>
    {@render children()}
  </Editor.Context>
{:else}
  <Async store={expenses.get(id)}>
    {#snippet awaited(expense)}
      <Editor.Context value={expense}>
        {@render children()}
      </Editor.Context>
    {/snippet}
  </Async>
{/if}
