<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
  import { goto } from '$app/navigation'
  import { Hold } from '$com/buttons'
  import { archive } from '@/adventures'
  import Expense from './Expense.svelte'
  import { dict } from './intl'
  import type { Props } from './Expenses'

  const { adventure, expenses, title }: Props = $props()

  let busy = $state(false)

  async function remove() {
    busy = true

    const result = await archive(adventure, undefined)

    busy = false

    if (result instanceof Error) return

    goto('/')
  }
</script>

<div class="space-y-2">
  <h2>{$dict.expenses.title}</h2>
  {#if expenses.length > 0}
    {#each expenses as expense (expense.id)}
      <Expense {adventure} {expense} {title} />
    {/each}
  {:else}
    <p class="text-sm text-muted-foreground">{$dict.archive.delete.description}</p>
    <Hold
      size="lg"
      name="adventures-delete"
      onclick={remove}
      disabled={busy}
      label={$dict.archive.delete.button}
      variant="destructive"
      position="top"
      duration={2_000}
      class="w-full">
      <Trash2 />
      {$dict.finish.delete.button(title)}
    </Hold>
  {/if}
</div>
