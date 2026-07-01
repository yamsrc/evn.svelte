<script lang="ts">
  import { Coins } from '@/app/ui'
  import * as Card from '$ui/card'
  import { grammar } from '$lib/intl'
  import { dict } from '../intl'

  interface Props {
    paid: number
    total: number
  }

  const { paid, total }: Props = $props()
</script>

<div class="grid grid-cols-2 gap-2">
  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.details.total}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Coins amount={total} sign="neutral" class="text-3xl" />
    </Card.Content>
  </Card.Root>

  <Card.Root class="px-4 py-3 gap-0 justify-between">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.details.paid($grammar)}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Coins amount={paid} sign="neutral" class="text-3xl" />
    </Card.Content>
  </Card.Root>
</div>
