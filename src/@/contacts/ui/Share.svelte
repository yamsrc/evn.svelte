<script lang="ts">
  import { ok } from 'svas'
  import { codes } from '@/accounts'
  import { dict } from '$lib/intl'
  import { QR } from '$com/qr'
  import { Share } from '$com/buttons'
  import type { Props } from './Share'

  const { contact }: Props = $props()

  let disabled = $state(false)

  async function data() {
    const url = await text()

    if (url === null) return null

    return { url }
  }

  async function text() {
    if (!ok(contact.account)) return null

    disabled = true

    const code = await codes.create(contact.account.id)

    disabled = false

    if (code instanceof Error) return null

    return `${window.location.origin}/join/accounts/${contact.account.id}/?code=${code}`
  }
</script>

{#if ok(contact.account)}
  <div class="flex flex-col gap-2">
    <Share
      id="contacts-share-button"
      size="lg"
      label={$dict.contacts.share.invite.link}
      {data}
      {disabled}
    />
    <QR size="lg" variant="secondary" {text} label={$dict.contacts.share.invite.qr} />
    <p class="text-sm text-muted-foreground text-center">
      {$dict.contacts.share.invite.description}
    </p>
  </div>
{/if}
