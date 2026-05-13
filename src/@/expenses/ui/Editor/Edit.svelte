<script lang="ts">
  import { account } from '@/iam'
  import { Selector } from '@/groups/ui'
  import { groups } from '@/groups'
  import { Delete } from '@/expenses.templates/ui'
  import { add, update } from '@/expenses'
  import { Section } from '@/app/ui'
  import { goto } from '$app/navigation'
  import Attachments from '../Attachments.svelte'
  import Template from './Template.svelte'
  import { redistribute } from './Form/Total'
  import { Form } from './Form'
  import { getContext } from './Context'
  import type { Props } from './Edit'
  import type { Value } from './Context'

  let { id, value = $bindable(), mode = $bindable<'sums' | 'shares'>('sums') }: Props = $props()

  const ctx = getContext()
  const groupId = $derived(value.links?.find((link) => link.type === 'group')?.id)

  function onpickGroup(id?: string) {
    const otherLinks = (value.links ?? []).filter((link) => link.type !== 'group')

    value.links = id ? [...otherLinks, { type: 'group', id }] : otherLinks

    const group = $groups.find((g) => g.id === id)

    if (group === undefined) return

    const addedParticipants = Object.fromEntries(
      group.identities
        .filter((identity) => !(identity in value.participants))
        .map((identity) => [
          identity,
          {
            amount: 0,
            shares: 0,
            paid: $account?.id === identity ? 0 : undefined,
          },
        ]),
    )

    value.participants = { ...value.participants, ...addedParticipants }
    redistribute(value)
  }

  async function onsubmit(value: Value) {
    const creating = id === undefined
    const modified = JSON.stringify(ctx.value) !== ctx.snapshot

    if (creating || modified) {
      const { total: _, ...rest } = value // :(
      const expense = id === undefined ? await add(rest) : await update(id, rest)

      if (expense instanceof Error) return expense
    }

    if (groupId) await goto(`/contacts/groups/${groupId}`)
    else await goto('/expenses/', { replaceState: true })
  }
</script>

{#if value.attachments.length > 0}
  <Attachments bind:attachments={value.attachments} editable={true} />
{/if}

{#if !id}
  <Section class="overflow-visible">
    <Selector id={groupId} onchange={onpickGroup} />
  </Section>
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
