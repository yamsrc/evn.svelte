<script lang="ts">
  import { ArrowUpDown } from '@lucide/svelte'
  import { Async } from 'svas'
  import { ok } from 'svas'
  import { QR } from '$com/qr'
  import { Section } from '$com/section'
  import { Share } from '$com/share'
  import { origin } from '$config'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { contacts } from '@/contacts'
  import { account } from '@/iam'

  const invitation = $derived(
    ok($account)
      ? {
          url: `${origin}/join/${$account.id}/`,
        }
      : undefined,
  )
</script>

<Section class="flex flex-col gap-6 pt-2">
  <header class="flex justify-between items-center relative">
    <h1>{$dict.contacts.title}</h1>
    <Button
      size="icon"
      variant="secondary"
      class="size-12 bg-accent/50 border border-border"
      disabled
    >
      <ArrowUpDown class="size-5" />
    </Button>
  </header>
</Section>
<Async store={contacts} class="flex-1 flex flex-col">
  {#snippet awaited(contacts)}
    {#if contacts.length === 0 && invitation}
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
    {/if}
  {/snippet}
</Async>
