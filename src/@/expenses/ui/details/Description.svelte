<script lang="ts">
  import { locale } from '$lib/intl'
  import { date } from '$lib/tools'
  import type { Props } from './Description'

  const { expense }: Props = $props()
</script>

<div class="space-y-2">
  <div class="text-2xl font-bold">{expense.title}</div>
  {#if expense.location}
    <div class="text-muted-foreground">{expense.location}</div>
  {/if}
  <div class="text-sm text-muted-foreground">{date(expense.date, $locale)}</div>
</div>
