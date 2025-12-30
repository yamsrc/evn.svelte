<script lang="ts">
  import { Back } from '$com/history'
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
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
