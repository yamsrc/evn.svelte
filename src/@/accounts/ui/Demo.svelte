<script lang="ts">
  import { ClockFading } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { Spinner } from '$ui/spinner'
  import { demo } from '@/accounts/svc/demo'
  import { dict } from './intl'

  let busy = $state(false)

  async function onclick() {
    busy = true

    const account = await demo()

    busy = false

    if (account instanceof Error) return

    console.log(account)
  }
</script>

<Button variant="outline" class="w-fit self-center" {onclick} disabled={busy}>
  {#if busy}
    <Spinner />
  {:else}
    <ClockFading />
  {/if}
  {$dict.demo.button}
</Button>
