<script lang="ts">
  import { Async } from 'svas'
  import { goto } from '$app/navigation'
  import { Section } from '$com/section'
  import { dict } from '$lib/intl'
  import { Button } from '$ui/button'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import * as contacts from '@/contacts'
  import type { Props } from './Invitation'

  const { id, children }: Props = $props()

  const inviter = $derived(accounts.get(id))

  let accepted = $state(false)

  async function accept() {
    accepted = true

    await contacts.add({ with: id })

    goto('/')
  }
</script>

<Section class="flex-1 flex flex-col items-center justify-center gap-8 max-w-sm mx-auto">
  <img src="/logo.svg" alt="seed.me" />
  {#if accepted}
    {@render children()}
  {:else}
    <Async store={inviter}>
      {#snippet awaited(inviter)}
        <div class="flex flex-col items-center justify-center gap-4">
          <p class="text-center text-lg">
            {$dict.join.app.description}
          </p>
          <div class="flex flex-row gap-4 p-4 rounded-md bg-muted text-lg">
            <Picture account={inviter} class="size-10" />
            <p>
              {$dict.join.inviter.description(inviter.name)}
            </p>
          </div>
          <Button size="lg" onclick={accept}>{$dict.join.accept}</Button>
        </div>
      {/snippet}
    </Async>
  {/if}
</Section>
