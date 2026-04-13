<script lang="ts">
  import { dict } from '@/notifications/ui/intl'
  import Base from '../Base.svelte'
  import type { PayloadOf } from '@/notifications'
  import type { Props } from './Joined'

  const { notification }: Props = $props()

  function format(merchant: NonNullable<PayloadOf<'receipts', 'joined'>['merchant']>) {
    const parts = [merchant.display]

    if (merchant.location !== undefined) parts.push(merchant.location)

    return parts.join(' • ')
  }

  const merchant = $derived(notification.payload.merchant)
  const title = $derived(
    merchant === undefined ? $dict.receipts.joined.title : format(merchant),
  )
</script>

<Base href={`/expenses/editor/${notification.key}`}>
  <div>
    {title}
    <p class="text-muted-foreground">{$dict.receipts.joined.hint}</p>
  </div>
</Base>
