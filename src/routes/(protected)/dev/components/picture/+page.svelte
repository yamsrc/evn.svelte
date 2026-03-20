<script lang="ts">
  import { Picture } from '@/media/ui'
  import { Section, Header } from '@/app/ui'
  import { dict } from '$lib/intl/dev'
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.components.picture.title}</Header.Title>
  </Header.Root>
</Section>

<Section>
  <Picture
    id="31ab0842c23bf715e5530121f906e8d1"
    variant="700x500"
    class="w-[350px] h-[250px] rounded-lg mx-auto" />
</Section>
