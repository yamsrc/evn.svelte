<script lang="ts">
  import { Async } from 'svas'
  import { Scan } from '@/receipts/ui'
  import { receipts } from '@/receipts'
  import { Section, Header, actionVariants } from '@/app/ui'
  import { dict } from '$lib/intl/dev'
  import { Actions } from '$com/shell'
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
          <li>
            <a href={`${receipt.id}/`}>{receipt.title || receipt.id}</a>
          </li>
        {/each}
      </ul>
    {/snippet}
  </Async>
</Section>

<Actions>
  <Scan class={actionVariants()} />
</Actions>
