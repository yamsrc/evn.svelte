<script lang="ts">
  import * as Card from '$ui/card'
  import { Coins } from '@/app/ui'
  import { dict } from './intl'
  import type { Props } from './Totals'

  const { balance, total }: Props = $props()
</script>

<div class="grid grid-cols-2 gap-2">
  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.spending.yours}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Coins amount={balance} sign="neutral" class="text-3xl" />
    </Card.Content>
  </Card.Root>

  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.spending.total}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Coins amount={total} sign="neutral" class="text-3xl" />
    </Card.Content>
  </Card.Root>
</div>
