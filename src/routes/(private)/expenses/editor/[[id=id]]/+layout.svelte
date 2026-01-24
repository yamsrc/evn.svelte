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
  <Async store={expenses}>
    {#snippet awaited(expenses)}
      {@const expense = expenses.find((expense) => expense.id === id)}
      {#if expense}
        {#key id}
          {@const value = {
            title: expense.title ?? '',
            location: expense.location,
            participants: expense.participants,
            extras: expense.extras,
            attachments: expense.attachments,
          }}
          <Editor.Context {value}>
            {@render children()}
          </Editor.Context>
        {/key}
      {/if}
    {/snippet}
  </Async>
{/if}
