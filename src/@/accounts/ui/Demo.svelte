<script lang="ts">
  import { ClockFading } from '@lucide/svelte'
  import { demo } from '@/accounts/svc/demo'
  import { Spinner } from '$ui/spinner'
  import { Button } from '$ui/button'
  import { dict } from './intl'

  let busy = $state(false)

  async function onclick() {
    busy = true

    await demo()

    busy = false
  }
</script>

<Button variant="ghost" class="w-fit self-center" {onclick} disabled={busy}>
  {#if busy}
    <Spinner />
  {:else}
    <ClockFading />
  {/if}
  {$dict.demo.button}
</Button>
