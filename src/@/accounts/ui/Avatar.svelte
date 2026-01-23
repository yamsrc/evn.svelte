<script lang="ts">
  import { Picture } from '@/accounts/ui'
  import type { Props } from './Avatar'

  const { account, size = 32, ...rest }: Props = $props()
</script>

<Picture {account} {size} {...rest} />
