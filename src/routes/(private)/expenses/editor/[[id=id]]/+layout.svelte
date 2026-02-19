<script lang="ts">
  import { Async, ok } from 'svas'
  import { page } from '$app/state'
  import { expenses } from '@/expenses'
  import { Editor } from '@/expenses/ui'
  import { account } from '@/iam'

  const { children } = $props()
  const id = $derived(page.params.id)

  const value = $derived.by(() => {
    if (page.state.expense) return page.state.expense

    if (ok($account)) return { participants: { [$account.id]: { amount: 0, paid: 0, shares: 0 } } }
  })
</script>

{#if id === undefined}
  <Editor.Context {value}>
    {@render children()}
  </Editor.Context>
{:else}
  <Async store={expenses}>
    {#snippet awaited(expenses)}
      {@const expense = expenses.find((expense) => expense.id === id)}
      {#if expense}
        <!-- do not ever touch this #key -->
        {#key id}
          <Editor.Context value={expense}>
            {@render children()}
          </Editor.Context>
        {/key}
      {/if}
    {/snippet}
  </Async>
{/if}
