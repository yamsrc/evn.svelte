<script lang="ts">
  import { Async } from 'svas'
  import { Indicator, Scan } from '@/receipts/ui'
  import { receipts } from '@/receipts'
  import { Section, Header, actionVariants, Coins } from '@/app/ui'
  import { dict } from '$lib/intl/dev'
  import { Actions } from '$com/shell'
  import { goto } from '$app/navigation'
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.components.receipts.title}</Header.Title>
  </Header.Root>
</Section>

<Section>
  <Async store={receipts}>
    {#snippet awaited(receipts)}
      <ul>
        {#each receipts as receipt (receipt.id)}
          <li class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-1">
              <Indicator {receipt} />
              <a href={`${receipt.id}/`}>{receipt.title || receipt.id}</a>
            </div>
            <span><Coins amount={receipt.total} /></span>
          </li>
        {/each}
      </ul>
    {/snippet}
  </Async>
</Section>

<Actions>
  <Scan class={actionVariants()} oncomplete={(id) => goto(`./${id}/`)} />
</Actions>
