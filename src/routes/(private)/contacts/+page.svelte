<script lang="ts">
  import { ArrowUpDown, QrCode, Share2 } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { contacts } from '@/contacts'
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
    {#if contacts.length === 0}
      <Section class="flex-1 flex flex-col items-center justify-center space-y-2">
        <h2>{$dict.contacts.empty.title}</h2>
        <p>{$dict.contacts.empty.description}</p>
        <Button variant="secondary" size="lg" class="w-full">
          <Share2 />
          {$dict.contacts.empty.invite.share}
        </Button>
        <Button variant="secondary" size="lg" class="w-full">
          <QrCode />
          {$dict.contacts.empty.invite.qr}
        </Button>
      </Section>
    {/if}
  {/snippet}
</Async>
