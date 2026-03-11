<script lang="ts">
  import { UploadIcon } from '@lucide/svelte'
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl/dev'
  import { Section, Header } from '@/app/ui'
  import { Upload } from '@/receipts/ui'

  function onstart() {
    void goto('./pending/')
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.components.receipts.title}</Header.Title>
  </Header.Root>
</Section>

<Section>
  <Upload {onstart}>
    <UploadIcon />
    {$dict.components.receipts.upload.label}
  </Upload>
</Section>
