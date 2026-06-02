<script lang="ts">
  import { dict } from './intl'
  import Leaderboard from './Leaderboard.svelte'
  import type { Contact } from '@/contacts'
  import type { Props } from './Tops'
  import type { Entry } from './Leaderboard'

  const { contacts }: Props = $props()

  const entry = (contact: Contact): Entry => ({
    id: contact.identity,
    value: contact.balance,
    href: `/contacts/${contact.identity}/`,
  })

  const negative = $derived(contacts.filter((contact) => contact.balance < 0).map(entry))
  const positive = $derived(contacts.filter((contact) => contact.balance > 0).map(entry))
</script>

<div class="space-y-2">
  <h2>{$dict.tops.title}</h2>

  {#if negative.length + positive.length === 0}
    <p class="text-muted-foreground">{$dict.tops.empty}</p>
  {:else}
    <div class="space-y-4">
      {#if negative.length > 0}
        <div class="space-y-1">
          <p>{$dict.tops.negative}</p>
          <Leaderboard entries={negative} top={3} />
        </div>
      {/if}
      {#if positive.length > 0}
        <div class="space-y-1">
          <p>{$dict.tops.positive}</p>
          <Leaderboard entries={positive} top={3} />
        </div>
      {/if}
    </div>
  {/if}
</div>
