<script lang="ts">
  import { Async, combined } from 'svas'
  import { Splitter, Leave, Reset } from '@/receipts/ui'
  import { internal } from '@/receipts'
  import { account } from '@/iam'
  import { Header, Section, Error } from '@/app/ui'
  import { Skeleton } from '$ui/skeleton'
  import { Return } from '$com/shell'
  import { page } from '$app/state'
  import { goto } from '$app/navigation'

  const id = page.params.id as string

  let splitter = $state<Splitter | undefined>(undefined)
  let actor = $state('')

  function onleave(me: string) {
    if (me === actor) void goto('..')

    splitter?.leave()
  }
</script>

<Async store={combined(account, internal.get(id))}>
  {#snippet awaited([account, receipt])}
    <Section>
      <Header.Root class="gap-4">
        <div class="space-y-1 w-full">
          <Header.Title class="min-h-[1.2em]">
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

<Return />
