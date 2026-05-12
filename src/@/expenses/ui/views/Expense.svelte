<script lang="ts">
  import { Paperclip } from '@lucide/svelte'
  import { account } from '@/iam'
  import { groups } from '@/groups'
  import { description } from '@/expenses/ui'
  import { numbers, owe } from '@/expenses'
  import { Avatars, Balance } from '@/app/ui'
  import { locale, dict } from '$lib/intl'
  import { Attention } from '$com/shell'
  import { Separator } from '$com/separator'
  import * as Card from './card'
  import type { Props } from './Props'

  const { expense, highlighted }: Props = $props()
  const participants = $derived(Object.keys(expense.participants))
  const linked = $derived(expense.links?.find((l) => l.type === 'group')?.id)
  const desc = $derived(description(expense, $locale))
</script>

<Card.Root href={`/expenses/${expense.id}/`} {highlighted}>
  <Card.Row align="start">
    <Card.Side class="flex-1">
      <div class="flex items-center gap-1">
        {#if expense.attachments.length > 0}
          <Paperclip size={14} class="text-muted-foreground" />
        {/if}
        {#if expense.title}
          <span>{expense.title}</span>
        {/if}
        {#if highlighted}
          <Attention class="mx-1" />
        {/if}
      </div>
      <p class="text-sm text-muted-foreground">
        {desc}{#if linked}
          {@const group = $groups.find((g) => g.id === linked)}
          {#if group}
            {`, ${group.title}`}
          {/if}
        {/if}
      </p>
    </Card.Side>
    <Card.Metric amount={numbers.total(expense)} label={$dict.expenses.balance.total} />
  </Card.Row>
  <Separator />
  <Card.Row>
    <Card.Side class="flex-1">
      <Avatars identities={participants} max={5} class="flex-1 justify-start" />
    </Card.Side>
    <Balance
      balance={owe(expense.participants, expense.extras, $account?.id)}
      class="flex-col-reverse items-end" />
  </Card.Row>
</Card.Root>
