<script lang="ts">
  import { Async, combined } from 'svas'
  import { Splitter } from '@/receipts/ui'
  import { receipts } from '@/receipts'
  import { account } from '@/iam'
  import { Header, Section } from '@/app/ui'
  import { Return } from '$com/shell'
  import { page } from '$app/state'

  const id = $derived(page.params.id) as string
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
        </Header.Root>
      </Section>
    {/if}

    <Section>
      <Splitter {receipt} actor={account} />
    </Section>
  {/snippet}
</Async>

<Return />
