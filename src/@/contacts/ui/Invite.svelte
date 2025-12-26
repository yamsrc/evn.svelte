<script lang="ts" module>
  const rest = { size: 'lg', class: 'w-full' } as const
</script>

<script lang="ts">
  import { UserPlus2 } from '@lucide/svelte'
  import { QR } from '$com/qr'
  import { Section } from '$com/section'
  import { Separator } from '$com/separator'
  import { Share } from '$com/share'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import type { Props } from './Invite'

  const { id }: Props = $props()
  const invitation = $derived({ url: `${window.location.origin}/join/friends/${id}/` })
</script>

<Section class="flex-1 flex flex-col items-center justify-center space-y-2">
  <h2>{$dict.contacts.empty.title}</h2>
  <p>{$dict.contacts.empty.description}</p>
  <Share
    variant="secondary"
    {...rest}
    data={invitation}
    label={$dict.contacts.empty.invite.share}
  />
  <QR variant="secondary" {...rest} data={invitation.url} label={$dict.contacts.empty.invite.qr} />
  <Separator class="p-2 font-bold">{$dict.etc.or}</Separator>
  <Button href="/contacts/new/" {...rest}><UserPlus2 />{$dict.contacts.empty.invite.manual}</Button>
</Section>
