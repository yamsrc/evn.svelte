<script lang="ts">
  import { managed as accounts, update } from '@/accounts'
  import { Cosmetics, type Value } from '@/app/ui'
  import type { Props } from './Cosmetics'

  const { account, managed, ...rest }: Props = $props()

  async function onchange(value: Value) {
    if (managed) await accounts.update(account.id, { name: value.name, picture: value.picture })
    else await update(account.id, { name: value.name, picture: value.picture })
  }
</script>

<Cosmetics value={account} {onchange} {...rest} />
