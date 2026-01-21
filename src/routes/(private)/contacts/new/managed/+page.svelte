<script lang="ts">
  import { dict } from '$lib/intl'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { Create } from '@/contacts/ui'
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.contacts.title}</Header.Title>
  </Header.Root>
</Section>

<Section>
  <Create />
</Section>
