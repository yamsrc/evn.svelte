<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { dict } from '$lib/intl'
  import { currency } from '$lib/tools'
  import type { Props } from './Balance'

  const { balance }: Props = $props()

  function color(balance: number) {
    if (balance > 0) return 'var(--constructive)'

    if (balance < 0) return 'var(--destructive)'

    return 'var(--muted-foreground)'
  }
</script>

<div class="flex items-center flex-end gap-2">
  <div class="text-muted-foreground text-sm">
    {#if balance > 0}
      {$dict.contacts.contact.owesYou}
    {:else if balance < 0}
      {$dict.contacts.contact.youOwe}
    {/if}
  </div>
  <div class="font-bold text-foreground">
    {currency(Math.abs(balance))}
  </div>
  <div>
    <Coins size={16} color={color(balance)} />
  </div>
</div>
