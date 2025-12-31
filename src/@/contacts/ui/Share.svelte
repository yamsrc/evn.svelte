<script lang="ts">
  import { QrCode, Share2 } from '@lucide/svelte'
  import { ok } from 'svas'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import type { Props } from './Share'

  const { contact }: Props = $props()
</script>

{#if contact.account && ok(contact.account)}
  <div class="flex flex-col gap-2">
    <Button size="lg">
      <Share2 />
      {$dict.contacts.share.invite.link}
    </Button>
    <Button size="lg" variant="secondary">
      <QrCode />
      {$dict.contacts.share.invite.qr}
    </Button>
    <p class="text-sm text-muted-foreground text-center">
      {$dict.contacts.share.invite.description}
    </p>
  </div>
{/if}
