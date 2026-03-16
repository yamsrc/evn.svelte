<script lang="ts">
  import { dict } from '$lib/intl/dev'
  import { Section, Header } from '@/app/ui'
  import { Picture } from '@/media/ui'
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.components.picture.title}</Header.Title>
  </Header.Root>
</Section>

<Section>
  <Picture id="31ab0842c23bf715e5530121f906e8d1" variant="300x300!" />
</Section>
