<script lang="ts">
  import { Async } from 'svas'
  import { UploadIcon } from '@lucide/svelte'
  import { Upload } from '@/receipts/ui'
  import { receipts } from '@/receipts'
  import { Section, Header } from '@/app/ui'
  import { dict } from '$lib/intl/dev'
  import { goto } from '$app/navigation'

  function onstart() {
    void goto('./pending/')
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.components.receipts.title}</Header.Title>
    <Header.Actions>
      <Upload {onstart}>
        <UploadIcon />
        {$dict.components.receipts.upload.label}
      </Upload>
    </Header.Actions>
  </Header.Root>
</Section>

<Section>
  <Async store={receipts}>
    {#snippet awaited(receipts)}
      <ul>
        {#each receipts as receipt (receipt.id)}
          <li>
            <a href={`${receipt.id}/`}>{receipt.merchant?.display ?? receipt.id}</a>
          </li>
        {/each}
      </ul>
    {/snippet}
  </Async>
</Section>
