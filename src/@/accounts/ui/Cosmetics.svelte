<script lang="ts">
  import { update } from '@/accounts'
  import { Cosmetics, type Value } from '@/app/ui'
  import type { Props } from './Cosmetics'

  const { account, ...rest }: Props = $props()

  async function onchange(value: Value) {
    await update(account.id, { name: value.name, picture: value.picture })
  }
</script>

<Cosmetics value={account} {onchange} {...rest} />
