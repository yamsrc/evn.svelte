<script lang="ts">
  import { page } from '$app/state'
  import { Back } from '$com/history'
  import { dict } from '$lib/intl'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { Edit } from '@/expenses/ui'
  import { draft } from '@/expenses/ui'

  const id = $derived(page.params.id as string)
</script>

<Section>
  <Header.Root>
    <Back href="/expenses/">{$dict.expenses.title}</Back>
  </Header.Root>
</Section>

{#if $draft}
  <Edit {id} bind:draft={$draft} />
{/if}
