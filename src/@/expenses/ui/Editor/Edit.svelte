<script lang="ts">
  import { Delete } from '@/expenses.templates/ui'
  import { add, update } from '@/expenses'
  import { Section } from '@/app/ui'
  import { Selector } from '@/adventures/ui'
  import { back } from '$com/history'
  import Attachments from '../Attachments.svelte'
  import Template from './Template.svelte'
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

{#if !id}
  <Section class="overflow-visible">
    <Selector
      draft={{
        title: ctx.value.title,
        location: ctx.value.location,
        attachments: [...ctx.value.attachments],
      }} />
  </Section>
{/if}

{#if value.attachments.length > 0}
  <Attachments bind:attachments={value.attachments} editable={true} />
{/if}

<Section>
  <Form bind:value bind:mode {onsubmit} />

  {#if !id && !value.copied}
    <Template bind:value={value.template} />
  {/if}

  {#if value.copied}
    <div class="flex justify-center">
      <Delete id={value.copied} ondelete={() => void back('/expenses/')} />
    </div>
  {/if}
</Section>
