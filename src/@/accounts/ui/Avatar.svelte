<script lang="ts">
  import { Picture } from '@/accounts/ui'
  import { account } from '@/iam'
  import type { Props } from './Avatar'

  const props: Props = $props()
</script>

{#if $account}
  <Picture account={$account} {...props} style="view-transition-name: my-avatar;" />
{/if}
