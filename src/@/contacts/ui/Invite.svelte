<script lang="ts" module>
  const rest = { size: 'lg', class: 'w-full' } as const
</script>

<script lang="ts">
  import { UserPlus2 } from '@lucide/svelte'
  import { QR } from '$com/qr'
  import { Separator } from '$com/separator'
  import { Share } from '$com/share'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import type { Props } from './Invite'

  const { id }: Props = $props()
  const invitation = $derived({ url: `${window.location.origin}/join/friends/${id}/` })
</script>

<div class="w-full flex flex-col items-center justify-center gap-2">
  <Share
    variant="secondary"
    {...rest}
    data={invitation}
    label={$dict.contacts.empty.invite.share}
  />
  <QR variant="secondary" {...rest} text={invitation.url} label={$dict.contacts.empty.invite.qr} />
  <Separator class="p-2 font-bold">{$dict.etc.or}</Separator>
  <Button id="contacts-invite-manual-button" href="/contacts/new/managed/" {...rest}>
    <UserPlus2 />
    {$dict.contacts.empty.invite.manual}
  </Button>
</div>
