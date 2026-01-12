<script lang="ts">
  import { Progress } from '$ui/progress'
  import Panel from './Panel.svelte'
  import { dict } from './intl'
  import type { Contact, Props, Sign } from './Tops'

  const { contacts }: Props = $props()
  const LIMIT = 3

  const negative = $derived(
    contacts
      .filter((contact) => contact.balance < 0)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, LIMIT),
  )

  const positive = $derived(
    contacts
      .filter((contact) => contact.balance > 0)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, LIMIT),
  )
</script>

{#snippet list(sign: Sign, contacts: Contact[])}
  {@const total = contacts.reduce((acc, contact) => acc + contact.balance, 0)}
  <div class="space-y-1">
    <p>{$dict.tops[sign]}</p>
    <ul class="space-y-2">
      {#each contacts as contact (contact.id)}
        <li>
          <Panel {contact} />
          {#if contacts.length > 1}
            <div class="px-1">
              <Progress value={(contact.balance / total) * 100} class="h-1" />
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
{/snippet}

<div class="space-y-1">
  <h2>{$dict.tops.title}</h2>

  {#if negative.length + positive.length === 0}
    <p class="text-muted-foreground">{$dict.tops.empty}</p>
  {:else}
    {#if negative.length > 0}
      {@render list('negative', negative)}
    {/if}
    {#if positive.length > 0}
      {@render list('positive', positive)}
    {/if}
  {/if}
</div>
