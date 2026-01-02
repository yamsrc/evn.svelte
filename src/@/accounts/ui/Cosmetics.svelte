<script lang="ts">
  import { update } from '@/accounts'
  import { Cosmetics, type Value } from '@/app/ui'
  import type { Props } from './Cosmetics'

  const { account, managed, ...rest }: Props = $props()

  async function onchange(value: Value) {
    await update(account.id, { name: value.name, picture: value.picture }, managed)
  }
</script>

<Cosmetics value={account} {onchange} {...rest} />
