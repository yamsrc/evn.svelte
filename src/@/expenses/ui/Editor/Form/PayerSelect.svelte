<script lang="ts">
  import { dict } from '$lib/intl'
  import PayerSelect from '../../PayerSelect.svelte'
  import type { Props } from './PayerSelect'

  const { value = $bindable() }: Props = $props()
  const identities = $derived(Object.keys(value.participants))

  const payerId = $derived(
    identities.find((id) => value.participants[id].paid !== undefined) ?? identities[0],
  )

  function onchange(id: string | undefined) {
    for (const participantId of identities)
      if (value.participants[participantId].paid !== undefined)
        delete value.participants[participantId].paid

    if (id !== undefined) value.participants[id].paid = value.total.amount
  }
</script>

<div class="space-y-2">
  <h2>{$dict.expenses.payers.title}</h2>
  <PayerSelect value={payerId} {identities} {onchange} />
</div>
