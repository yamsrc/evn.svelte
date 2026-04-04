<script lang="ts">
  import { Async, combined } from 'svas'
  import { Splitter, Leave, Reset, Failed } from '@/receipts/ui'
  import { receipts } from '@/receipts'
  import { account } from '@/iam'
  import { Header, Section } from '@/app/ui'
  import { Skeleton } from '$ui/skeleton'
  import { Return } from '$com/shell'
  import { page } from '$app/state'
  import { goto } from '$app/navigation'

  const id = $derived(page.params.id) as string

  let splitter = $state<Splitter | undefined>(undefined)

  function onleave() {
    const myself = splitter?.leave()

    if (myself) void goto('..')
  }

  function onretry() {
    void goto('../pending/')
  }
</script>

<Async store={combined(account, receipts.get(id))}>
  {#snippet awaited([account, receipt])}
    <Section>
      <Header.Root class="gap-4">
        <div class="space-y-1 w-full">
          <Header.Title class="h-[1.2em]">
            {#if receipt.status === 'pending'}
              <Skeleton class="w-3/4 h-[1.2em]" />
            {:else}
              {receipt.title}
            {/if}
          </Header.Title>
          {#if receipt.status === 'pending' || receipt.merchant?.location}
            <Header.Subtitle class="h-[1.4em]">
              {#if receipt.merchant?.location}
                {receipt.merchant.location}
              {:else}
                <Skeleton class="w-1/2 h-full" />
              {/if}
            </Header.Subtitle>
          {/if}
        </div>
        <Header.Actions>
          <Reset {id} />
          <Leave {receipt} onclick={onleave} />
        </Header.Actions>
      </Header.Root>
    </Section>

    <Section>
      <Splitter bind:this={splitter} {receipt} {account} />
    </Section>
  {/snippet}
  {#snippet waiting()}
    {@render failed()}
  {/snippet}
  {#snippet error()}
    {@render failed()}
  {/snippet}
</Async>

{#snippet failed()}
  <Section class="m-auto">
    <Failed {onretry} />
  </Section>
{/snippet}

<Return />
