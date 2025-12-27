<script lang="ts">
  import { Share2 } from '@lucide/svelte'
  import { QR } from '$com/qr'
  import { Share } from '$com/share'
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import { buttonVariants } from '$ui/button'
  import * as DropdownMenu from '$ui/dropdown-menu'
  import type { Props } from './Invite'

  const { id }: Props = $props()

  const invitation = $derived({ url: `${window.location.origin}/join/groups/${id}/` })
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'flex-1')}>
    <Share2 size={16} />
    {$dict.invite.invite}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end" side="top" class="flex flex-col">
    <DropdownMenu.Item>
      {#snippet child()}
        <Share
          variant="ghost"
          size="lg"
          class="w-auto justify-start focus-visible:ring-0 focus-visible:border-none"
          data={invitation}
          label={$dict.invite.share}
        />
      {/snippet}
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>
      {#snippet child()}
        <QR
          variant="ghost"
          size="lg"
          class="w-auto justify-start focus-visible:ring-0 focus-visible:border-none"
          data={invitation.url}
          label={$dict.invite.qr}
        />
      {/snippet}
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
