<script lang="ts">
  import { Paperclip } from '@lucide/svelte'
  import { Card } from '@/expenses/ui'
  import { Avatars } from '@/app/ui'
  import { date } from '$lib/tools'
  import { locale, dict } from '$lib/intl'
  import { Attention } from '$com/shell'
  import { Separator } from '$com/separator'
  import type { Props } from './Receipt'

  const { receipt, highlighted }: Props = $props()
  const description = $derived(
    `${receipt.date ? date(receipt.date, $locale) : ''} ${receipt.merchant?.location ? `, ${receipt.merchant.location}` : ''}`,
  )
</script>

<Card.Root
  {highlighted}
  href={`/dev/receipts/${receipt.id}/`}
  class="bg-warning/20! border-warning/30! hover:bg-warning/25! hover:border-warning/35!">
  <Card.Row align="start">
    <Card.Side class="flex-1">
      <div class="flex items-center gap-1">
        {#if receipt.attachments.length > 0}
          <Paperclip size={14} class="text-muted-foreground" />
        {/if}
        {#if receipt.title}
          <span>{receipt.title}</span>
        {/if}
        {#if highlighted}
          <Attention class="mx-1" />
        {/if}
      </div>
      <p class="text-sm text-muted-foreground">{description}</p>
    </Card.Side>
    <Card.Metric amount={receipt.total} label={$dict.expenses.balance.total} />
  </Card.Row>
  <Separator />
  <Card.Row>
    <Card.Side class="flex-1">
      <Avatars identities={receipt.identities} max={5} class="flex-1 justify-start" />
    </Card.Side>
  </Card.Row>
</Card.Root>
