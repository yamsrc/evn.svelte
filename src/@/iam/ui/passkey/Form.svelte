<script lang="ts">
  import { onMount } from 'svelte'
  import { ArrowRight } from '@lucide/svelte'
  import { dict } from '@/iam/ui/intl'
  import { passkeys } from '@/iam'
  import { Input } from '$ui/input'
  import { Button } from '$ui/button'
  import { autofocus, onsubmit } from '$lib/tools'
  import { Loader } from '$com/loader'
  import type { Props } from './Form'

  const { account, disabled, oncreate, onauthenticate }: Props = $props()

  let value = $derived(account?.name ?? '')
  let busy = $state(false)

  async function submit() {
    const name = value.trim()

    if (name.length === 0) return

    busy = true

    const echo = await passkeys.create(name, account?.id)

    busy = false

    if (echo instanceof Error) return

    oncreate?.(echo)
  }

  onMount(() => passkeys.mount(() => onauthenticate?.('passkey')))
</script>

<form onsubmit={onsubmit(submit)}>
  <fieldset class="space-y-1" {disabled}>
    <div class="flex items-center gap-2">
      <Input
        bind:value
        id="name"
        type="text"
        placeholder={$dict.auth.yourName}
        autocomplete="username webauthn"
        required
        {autofocus} />
      <Button id="iam-passkey-create-button" size="icon" type="submit" class="size-12">
        {#if busy}
          <Loader />
        {:else}
          <ArrowRight class="size-5" />
        {/if}
      </Button>
    </div>
  </fieldset>
</form>
