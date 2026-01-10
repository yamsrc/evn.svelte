<script lang="ts">
  import { Async } from 'svas'
  import { dict } from '$lib/intl'
  import { Section } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { account as me } from '@/iam'
  import Payer from './Payer.svelte'
  import type { Props } from './Payers'

  const { value = $bindable() }: Props = $props()

  function ontoggle(identity: string, on: boolean) {
    console.log('ontoggle', identity, on)
  }
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    <Section class="flex flex-col gap-1.5" id="expenses-payers-list">
      <h2>{$dict.expenses.payers.title}</h2>
      <div id="expenses-payers-list-content" class="flex flex-col gap-1.5">
        {#each Object.keys(value.participants) as identity (identity)}
          {#if identity === $me?.id}
            <Payer bind:participant={value.participants[identity]} {ontoggle} />
          {:else}
            {@const contact = contacts.find((c) => c.identity === identity)}
            {#if contact}
              <Payer bind:participant={value.participants[identity]} {contact} {ontoggle} />
            {/if}
          {/if}
        {/each}
      </div>
    </Section>
  {/snippet}
</Async>
