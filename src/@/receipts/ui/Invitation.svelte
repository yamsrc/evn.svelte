<script lang="ts">
  import { onMount } from 'svelte'
  import { invitations } from '@/receipts'
  import { Button } from '$ui/button'
  import type { Props } from './Invitation'

  const {
    receiptId,
    invitation: initial = null,
    onaccept,
  }: Props = $props()

  let invitation = $state(initial)
  let loading = $state(initial == null)
  let error = $state<string | null>(null)
  let accepting = $state(false)

  onMount(() => {
    if (initial != null) return

    invitations.get(receiptId).then((res) => {
      loading = false

      if (res instanceof Error) error = res.message
      else invitation = res
    })
  })

  async function onjoin() {
    accepting = true

    const res = await invitations.accept(receiptId)

    if (res instanceof Error)
      accepting = false
    else
      onaccept?.()
  }
</script>

{#if loading}
  <!-- TODO: i18n -->
  <p>Loading…</p>
{:else if error}
  <p>{error}</p>
{:else if invitation}
  <!-- TODO: i18n -->
  <p>Receipt {invitation.id}, {invitation.identities.length} participant(s)</p>
  <!-- TODO: i18n -->
  <Button onclick={onjoin} disabled={accepting}>Join</Button>
{/if}
