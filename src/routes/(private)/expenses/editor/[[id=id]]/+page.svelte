<script lang="ts">
  import { page } from '$app/state'
  import { Back } from '$com/history'
  import { dict } from '$lib/intl'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { Editor } from '@/expenses/ui'

  const id = $derived(page.params.id)
  const ctx = Editor.getContext()
</script>

<Section>
  <Header.Root>
    <Back href="/expenses/">{$dict.expenses.title}</Back>
  </Header.Root>
</Section>

<Editor.Edit {id} bind:value={ctx.value} bind:mode={ctx.mode} />
