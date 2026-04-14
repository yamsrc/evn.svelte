<script lang="ts">
  import { description } from '@/expenses/ui'
  import { locale } from '$lib/intl'
  import type { Props } from './Description'

  const { expense }: Props = $props()
</script>

<div>
  <div id="expenses-details-title" class="text-2xl font-bold">{expense.title ?? ''}</div>
  <div class="text-muted-foreground">{description(expense, $locale)}</div>
</div>
