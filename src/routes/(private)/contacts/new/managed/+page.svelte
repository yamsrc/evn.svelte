<script lang="ts">
  import { Back } from '$com/history'
  import { dict } from '$lib/intl'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { Create } from '@/contacts/ui'
</script>

<Section>
  <Header.Root>
    <Back href="/contacts/">{$dict.contacts.title}</Back>
  </Header.Root>
</Section>

<Section>
  <Create />
</Section>
