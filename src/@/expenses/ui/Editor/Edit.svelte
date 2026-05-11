<script lang="ts">
  import { account } from '@/iam'
  import { Selector } from '@/groups/ui'
  import { groups } from '@/groups'
  import { Delete } from '@/expenses.templates/ui'
  import { add, numbers, update } from '@/expenses'
  import { Section } from '@/app/ui'
  import { back } from '$com/history'
  import { goto } from '$app/navigation'
  import Attachments from '../Attachments.svelte'
  import Template from './Template.svelte'
  import { Form } from './Form'
  import { getContext } from './Context'
  import type { Props } from './Edit'
  import type { Value } from './Context'

  let { id, value = $bindable(), mode = $bindable<'sums' | 'shares'>('sums') }: Props = $props()

  const ctx = getContext()

  const groupId = $derived(value.links?.find((link) => link.type === 'group')?.id)

  function onpickGroup(id?: string) {
    const others = (value.links ?? []).filter((link) => link.type !== 'group')

    value.links = id ? [...others, { type: 'group', id }] : others

    const total = numbers.total(value)

    if (id === undefined) {
      value.participants = $account ? { [$account.id]: { amount: total, shares: 0, paid: 0 } } : {}

      return
    }

    const group = $groups.find((g) => g.id === id)

    if (group === undefined) return

    const split = total > 0 ? numbers.split(total, group.identities) : {}

    value.participants = Object.fromEntries(
      group.identities.map((identity) => [
        identity,
        {
          amount: split[identity] ?? 0,
          shares: 0,
          paid: $account?.id === identity ? 0 : undefined,
        },
      ]),
    )
  }

  async function onsubmit(value: Value) {
    const creating = id === undefined
    const modified = JSON.stringify(ctx.value) !== ctx.snapshot

    if (creating || modified) {
      const expense = id === undefined ? await add(value) : await update(id, value)

      if (expense instanceof Error) return expense
    }

    if (groupId) await goto(`/contacts/groups/${groupId}`)
    else await back('/expenses/')
  }
</script>

{#if !id}
  <Section class="overflow-visible">
    <Selector id={groupId} onchange={onpickGroup} />
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
      <Delete id={value.copied} ondelete={() => (value.copied = undefined)} />
    </div>
  {/if}
</Section>
