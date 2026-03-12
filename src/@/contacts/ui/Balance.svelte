<script lang="ts">
  import { Coins } from '@/app/ui'
  import { cn } from '$lib/utils'
  import { dict } from '$lib/intl'
  import type { Props } from './Balance'

  const { contact, class: classes }: Props = $props()
</script>

<div class={cn('flex items-center gap-2', classes)}>
  <div class="text-muted-foreground text-sm text-nowrap">
    {#if contact.balance > 0}
      {$dict.contacts.contact.owesYou}
    {:else if contact.balance < 0}
      {$dict.contacts.contact.youOwe}
    {:else}
      {$dict.contacts.contact.even}
    {/if}
  </div>
  {#if contact.balance !== 0}
    <Coins amount={contact.balance} />
  {/if}
</div>
