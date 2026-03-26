<script lang="ts">
  import { UserPlus, Check } from '@lucide/svelte'
  import { Action } from '@/app/ui'
  import { Actions } from '$com/shell'
  import type { Props } from './Actions'

  const { receipt }: Props = $props()
</script>

<Actions>
  <Action
    id="nav-action-receipt-share"
    variant={receipt.identities.length === 1 ? 'default' : 'secondary'}>
    <UserPlus />
  </Action>
  <Action
    id="nav-action-receipt-split"
    variant={receipt.identities.length === 1 ? 'secondary' : 'default'}>
    <Check />
  </Action>
</Actions>
