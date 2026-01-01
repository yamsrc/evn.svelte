<script lang="ts">
  import { ensure, ok } from 'svas'
  import { QR } from '$com/qr'
  import { Share } from '$com/share'
  import { dict } from '$lib/intl'
  import { createCode } from '@/accounts'
  import { account } from '@/iam'
  import type { Props } from './Share'

  const { contact }: Props = $props()

  let disabled = $state(false)

  async function share() {
    const url = await getUrl()

    if (url === null) return null

    return { url }
  }

  async function getUrl() {
    if (!contact.account || !ok(contact.account)) return null

    const me = ensure(account)

    disabled = true

    const code = await createCode(contact.account.id)

    disabled = false

    if (code instanceof Error) return null

    return `${window.location.origin}/join/capture/${me.id}/?code=${code}`
  }
</script>

{#if contact.account && ok(contact.account)}
  <div class="flex flex-col gap-2">
    <Share
      id="contacts-share-button"
      size="lg"
      {disabled}
      data={share}
      label={$dict.contacts.share.invite.link}
    />
    <QR size="lg" variant="secondary" text={getUrl} label={$dict.contacts.share.invite.qr} />
    <p class="text-sm text-muted-foreground text-center">
      {$dict.contacts.share.invite.description}
    </p>
  </div>
{/if}
