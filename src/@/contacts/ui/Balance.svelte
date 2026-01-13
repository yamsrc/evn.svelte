<script lang="ts">
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import { Coins } from '@/app/ui'
  import type { Props } from './Balance'

  const { contact, class: classes }: Props = $props()
</script>

<div class={cn('flex gap-2', classes)}>
  <div class="text-muted-foreground text-sm text-nowrap">
    {#if contact.balance > 0}
      {$dict.contacts.contact.owesYou}
    {:else if contact.balance < 0}
      {$dict.contacts.contact.youOwe}
    {/if}
  </div>
  <Coins amount={contact.balance} />
</div>
