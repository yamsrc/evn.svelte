<script lang="ts">
  import { UploadIcon } from '@lucide/svelte'
  import { Upload } from '@/receipts/ui'
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
  </Header.Root>
</Section>

<Section>
  <Upload {onstart}>
    <UploadIcon />
    {$dict.components.receipts.upload.label}
  </Upload>
</Section>
