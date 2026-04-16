<script lang="ts">
  import { Check, Pencil } from '@lucide/svelte'
  import { claim } from '@/receipts'
  import { Action } from '@/app/ui'
  import { store } from './store'
  import { extract, itemsClaimedBy } from './claims'
  import type { Props } from './Done'

  const { receipt, actor, ondone, ...props }: Props = $props()

  async function onclick(e: MouseEvent) {
    const button = e.target as HTMLButtonElement

    button.disabled = true

    if (receipt.done[actor] === true) await edit()
    else await done()

    button.disabled = false
  }

  async function done() {
    const claims = extract($store, actor)

    const claimed = await claim(receipt.id, {
      identity: actor,
      claims,
      done: true,
    })

    if (!(claimed instanceof Error)) ondone?.()
  }

  async function edit() {
    await claim(receipt.id, {
      identity: actor,
      done: false,
    })
  }
</script>

<Action
  {onclick}
  {...props}
  disabled={receipt.done[actor] !== true && itemsClaimedBy($store, actor).length === 0}>
  {#if receipt.done[actor] === true}
    <Pencil />
  {:else}
    <Check />
  {/if}
</Action>
