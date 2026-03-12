<script lang="ts">
  import { locale } from '$lib/intl'
  import { date } from '$lib/tools'
  import type { Props } from './Description'

  const { expense }: Props = $props()
</script>

<div class="space-y-2">
  <div id="adventures-details-title" class="text-2xl font-bold">{expense.title ?? ''}</div>
  <div class="text-muted-foreground">
    {date(expense.date, $locale)}{#if expense.location}, {expense.location}{/if}
  </div>
</div>
