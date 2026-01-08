<script lang="ts">
  import { getContext } from 'svelte'
  import { page } from '$app/state'
  import { Back } from '$com/history'
  import { dict } from '$lib/intl'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { Editor } from '@/expenses/ui'
  import type { Context } from '@/expenses/ui/Editor/Context'

  const id = $derived(page.params.id)
  const ctx = getContext<Context>('editor')
</script>

<Section>
  <Header.Root>
    <Back href="/expenses/">{$dict.expenses.title}</Back>
  </Header.Root>
</Section>

<Editor.Edit {id} bind:value={ctx.value} />
