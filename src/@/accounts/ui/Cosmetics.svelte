<script lang="ts">
  import * as Cosmetics from '@/app/ui/cosmetics'
  import { Avatar } from '@/accounts/ui'
  import { managed as accounts, upload, update } from '@/accounts'
  import type { Props } from './Cosmetics'

  const {
    account,
    managed = false,
    editable = true,
    pictureStyle,
    class: classes,
  }: Props = $props()

  async function save(name: string) {
    if (managed) await accounts.update(account.id, { name })
    else await update(account.id, { name })
  }

  async function onupload(file: File) {
    await upload(account.id, file)
  }
</script>

<Cosmetics.Root class={classes}>
  <Cosmetics.Content>
    <Cosmetics.Upload {onupload} disabled={!editable}>
      <Avatar {account} style={pictureStyle} size={150} />
    </Cosmetics.Upload>
    <Cosmetics.Name value={account.name} onchange={save} {editable} class="w-full" />
  </Cosmetics.Content>
</Cosmetics.Root>
