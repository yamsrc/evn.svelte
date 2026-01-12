<script lang="ts">
  import * as Card from '$ui/card'
  import { Coins } from '@/app/ui'
  import { dict } from './intl'
  import type { Props, Sign } from './Totals'

  const { contacts }: Props = $props()

  const negative = $derived(
    contacts
      .filter((contact) => contact.balance < 0)
      .reduce((acc, contact) => acc + contact.balance, 0),
  )

  const positive = $derived(
    contacts
      .filter((contact) => contact.balance > 0)
      .reduce((acc, contact) => acc + contact.balance, 0),
  )
</script>

{#snippet card(sign: Sign, amount: number)}
  <Card.Root class="px-4 py-3 gap-0">
    <Card.Header class="p-0">
      <Card.Title class="text-sm text-muted-foreground">
        {$dict.totals[sign]}
      </Card.Title>
    </Card.Header>
    <Card.Content class="p-0">
      <Coins {amount} {sign} class="text-3xl" />
    </Card.Content>
  </Card.Root>
{/snippet}

<div class="grid grid-cols-2 gap-2">
  {@render card('negative', negative)}
  {@render card('positive', positive)}
</div>
