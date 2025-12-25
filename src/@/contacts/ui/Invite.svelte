<script lang="ts">
  import { QR } from '$com/qr'
  import { Section } from '$com/section'
  import { Share } from '$com/share'
  import { dict } from '$lib/intl'
  import type { Props } from './Invite'

  const { id }: Props = $props()

  const invitation = $derived({ url: `${window.location.origin}/join/friends/${id}/` })
</script>

<Section class="flex-1 flex flex-col items-center justify-center space-y-2">
  <h2>{$dict.contacts.empty.title}</h2>
  <p>{$dict.contacts.empty.description}</p>
  <Share
    variant="secondary"
    size="lg"
    class="w-full"
    data={invitation}
    label={$dict.contacts.empty.invite.share}
  />
  <QR
    variant="secondary"
    size="lg"
    class="w-full"
    data={invitation.url}
    label={$dict.contacts.empty.invite.qr}
  />
</Section>
