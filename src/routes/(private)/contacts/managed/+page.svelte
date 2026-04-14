<script lang="ts">
  import { Create } from '@/contacts/ui'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { dict } from '$lib/intl'
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.contacts.title}</Header.Title>
  </Header.Root>
</Section>

<Section>
  <Create />
</Section>
