<script lang="ts" module>
  const rest = { size: 'lg', class: 'w-full' } as const
</script>

<script lang="ts">
  import { UserPlus } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { dict } from '$lib/intl'
  import { Separator } from '$com/separator'
  import { QR } from '$com/qr'
  import { Share } from '$com/buttons'
  import type { Props } from './Invite'

  const { id }: Props = $props()
  const invitation = $derived({ url: `${window.location.origin}/join/friends/${id}/` })
</script>

<div class="w-full flex flex-col items-center justify-center gap-2">
  <Share {...rest} data={invitation} label={$dict.contacts.empty.invite.share} />
  <QR variant="secondary" {...rest} text={invitation.url} label={$dict.contacts.empty.invite.qr} />
  <Separator class="p-2 font-bold text-muted-foreground">{$dict.etc.or}</Separator>
  <Button variant="secondary" id="contacts-invite-manual-button" href="./managed/" {...rest}>
    <UserPlus />
    {$dict.contacts.empty.invite.manual}
  </Button>
</div>
