<script lang="ts">
  import { add, update } from '@/expenses'
  import { back } from '$com/history'
  import Attachments from '../Attachments.svelte'
  import { Form } from './Form'
  import { getContext } from './Context'
  import type { Props } from './Edit'
  import type { Value } from './Context'

  let { id, value = $bindable(), mode = $bindable<'sums' | 'shares'>('sums') }: Props = $props()

  const ctx = getContext()

  async function onsubmit(value: Value) {
    if (JSON.stringify(ctx.value) !== ctx.snapshot) {
      const expense = id === undefined ? await add(value) : await update(id, value)

      if (expense instanceof Error) return expense
    }

    await back('/expenses/')
  }
</script>

{#if value.attachments.length > 0}
  <Attachments bind:attachments={value.attachments} editable={true} />
{/if}

<Form bind:value bind:mode {onsubmit} />
