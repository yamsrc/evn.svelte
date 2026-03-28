<script lang="ts">
  import { Async, combined } from 'svas'
  import { Splitter, Leave, Reset } from '@/receipts/ui'
  import { receipts } from '@/receipts'
  import { account } from '@/iam'
  import { Header, Section } from '@/app/ui'
  import { Return } from '$com/shell'
  import { page } from '$app/state'
  import { goto } from '$app/navigation'

  const id = $derived(page.params.id) as string

  let splitter = $state<Splitter | undefined>(undefined)

  function onleave() {
    const myself = splitter?.leave()

    if (myself) void goto('..')
  }
</script>

<Async store={combined(account, receipts.get(id))}>
  {#snippet awaited([account, receipt])}
    {#if receipt.merchant?.display}
      <Section>
        <Header.Root>
          <div class="space-y-1">
            <Header.Title>{receipt.merchant.display}</Header.Title>
            {#if receipt.merchant.location}
              <Header.Subtitle>{receipt.merchant.location}</Header.Subtitle>
            {/if}
          </div>
          <Header.Actions>
            <Reset {id} />
            <Leave {receipt} onclick={onleave} />
          </Header.Actions>
        </Header.Root>
      </Section>
    {/if}

    <Section>
      <Splitter bind:this={splitter} {receipt} {account} />
    </Section>
  {/snippet}
</Async>

<Return />
