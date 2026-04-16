<script lang="ts">
  import { Async, combined } from 'svas'
  import { Leave, Splitter } from '@/receipts/ui'
  import { internal } from '@/receipts'
  import { account } from '@/iam'
  import { Header, Section, Error } from '@/app/ui'
  import { Skeleton } from '$ui/skeleton'
  import { page } from '$app/state'
  import { goto } from '$app/navigation'

  const id = $derived(page.params.id) as string

  let splitter = $state<Splitter | undefined>(undefined)
  let actor = $state('')

  function onleave(me: string) {
    if (me === actor) void goto('/expenses/')

    splitter?.leave()
  }
</script>

<Async store={combined(account, internal.get(id))}>
  {#snippet awaited([account, receipt])}
    <Section>
      <Header.Root>
        <Header.Content>
          <Header.Title>
            {#if receipt.status === 'pending'}
              <Skeleton class="w-3/4 h-lh" />
            {:else}
              {receipt.title}
            {/if}
          </Header.Title>
          <Header.Subtitle>
            {#if receipt.merchant?.location}
              {receipt.merchant.location}
            {:else if receipt.status === 'pending'}
              <Skeleton class="w-1/2 h-lh" />
            {/if}
          </Header.Subtitle>
        </Header.Content>
        <Header.Actions>
          <Leave {receipt} onclick={() => onleave(account.id)} />
        </Header.Actions>
      </Header.Root>
    </Section>
    <Section>
      <Splitter bind:this={splitter} {receipt} {account} bind:actor />
    </Section>
  {/snippet}
  {#snippet error()}
    <Error />
  {/snippet}
</Async>
