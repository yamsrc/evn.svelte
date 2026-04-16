<script lang="ts">
  import { Async } from 'svas'
  import { Receipts, Scan } from '@/receipts/ui'
  import { receipts } from '@/receipts'
  import { Section, Header, actionVariants } from '@/app/ui'
  import { dict } from '$lib/intl/dev'
  import { Actions } from '$com/shell'
  import { goto } from '$app/navigation'
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.components.receipts.title}</Header.Title>
  </Header.Root>
</Section>

<!-- <Section>
  <Dropzone oncomplete={(id) => goto(`./${id}/`)}>
    <div class="h-40 bg-muted rounded-md flex items-center justify-center">
      {$dict.receipts.dropzone.label}
    </div>
  </Dropzone>
</Section> -->

<Section>
  <Async store={receipts}>
    {#snippet awaited(receipts)}
      <Receipts {receipts} />
    {/snippet}
  </Async>
</Section>

<Actions>
  <Scan class={actionVariants()} oncomplete={(id) => goto(`./${id}/`)} />
</Actions>
