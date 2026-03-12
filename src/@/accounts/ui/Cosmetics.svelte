<script lang="ts">
  import { Cosmetics, type Value } from '@/app/ui'
  import { managed as accounts, upload, update } from '@/accounts'
  import type { Props } from './Cosmetics'

  const { account, managed, ...rest }: Props = $props()

  async function onchange(value: Value) {
    if (managed) await accounts.update(account.id, value)
    else await update(account.id, value)
  }

  async function onupload(file: File) {
    await upload(account.id, file)
  }
</script>

<Cosmetics value={account} {onchange} {onupload} {...rest} />
