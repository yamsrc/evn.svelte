<script lang="ts">
  import { Async } from 'svas'
  import { page } from '$app/state'
  import { expenses } from '@/expenses'
  import { Editor } from '@/expenses/ui'

  const { children } = $props()
  const id = $derived(page.params.id)
</script>

{#if id === undefined}
  <Editor.Context>
    {@render children()}
  </Editor.Context>
{:else}
  <Async store={expenses.get(id)} class="space-y-5">
    {#snippet awaited(expense)}
      <Editor.Context value={expense}>
        {@render children()}
      </Editor.Context>
    {/snippet}
  </Async>
{/if}
