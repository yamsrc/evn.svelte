<script lang="ts">
  import { Async, ok } from 'svas'
  import { account } from '@/iam'
  import { groups } from '@/groups'
  import { Editor } from '@/expenses/ui'
  import { expenses } from '@/expenses'
  import { page } from '$app/state'
  import type { Group } from '@/groups'

  const { children } = $props()
  const id = $derived(page.params.id)

  function build(loadedGroups: Group[]) {
    if (!ok($account)) return page.state.expense

    const stateExpense = page.state.expense
    const groupId = stateExpense?.links?.find((link) => link.type === 'group')?.id
    const group = groupId ? loadedGroups.find((g) => g.id === groupId) : undefined

    const participants = group
      ? Object.fromEntries(group.identities.map((identity) => buildIdentity(identity)))
      : { [$account.id]: { amount: 0, paid: 0, shares: 0 } }

    return stateExpense ? { participants, ...stateExpense } : { participants }
  }

  function buildIdentity(identity: string) {
    return [
      identity,
      { amount: 0, shares: 0, paid: ok($account) && $account.id === identity ? 0 : undefined },
    ]
  }
</script>

{#if id === undefined}
  <Async store={groups}>
    {#snippet awaited(loadedGroups)}
      <Editor.Context value={build(ok(loadedGroups) ? loadedGroups : [])}>
        {@render children()}
      </Editor.Context>
    {/snippet}
  </Async>
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
