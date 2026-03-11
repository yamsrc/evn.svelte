<script lang="ts">
  import { dict } from '$lib/intl/dev'
  import { Section, Header } from '@/app/ui'
  import { progress } from '@/receipts'
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.components.receipts.title}</Header.Title>
  </Header.Root>
</Section>

{#if $progress === null}
  <Section>pending...</Section>
{:else}
  <Section>{$progress.status}</Section>
{/if}
