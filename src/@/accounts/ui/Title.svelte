<script lang="ts">
  import { premium } from '@/accounts'
  import { Ellipsis } from '$com/text'
  import type { Props } from './Title'

  const { account, class: classes }: Props = $props()
</script>

<Ellipsis class={[premium(account) && 'text-premium', classes]}>{account.name}</Ellipsis>
