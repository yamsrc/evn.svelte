<script lang="ts">
  import { currency } from '$lib/tools'
  import { dict, locale } from '@/notifications/ui/intl'
  import Base from '../Base.svelte'
  import type { Props } from './Expense'

  const { notification }: Props = $props()

  const expense = $derived(notification.payload.expense)
  const amount = $derived(currency(expense.amount, $locale))
</script>

<Base href={`/adventures/${notification.key}/expenses/${expense.id}/`}>
  <div>
    {$dict.adventures.expense.title(expense.title, amount)}
    <p class="text-muted-foreground">
      {notification.payload.title}
    </p>
  </div>
</Base>
