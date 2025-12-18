<script lang="ts">
  import { ArrowRight } from '@lucide/svelte'
  import { Loader } from '$com/loader'
  import { autofocus, onsubmit } from '$lib/tools'
  import { Button } from '$ui/button'
  import { Input } from '$ui/input'
  import { passkeys } from '@/iam'
  import { dict } from '@/iam/ui/intl'

  const { disabled }: { disabled?: boolean } = $props()

  let value = $state('')
  let busy = $state(false)

  async function submit() {
    const name = value.trim()

    if (name.length === 0) return

    busy = true

    await passkeys.create(name)

    busy = false
  }
</script>

<form onsubmit={onsubmit(submit)}>
  <fieldset class="space-y-1" {disabled}>
    <div class="flex items-center gap-2">
      <Input
        bind:value
        class="placeholder:text-sm"
        id="name"
        type="text"
        placeholder={$dict.auth.yourName}
        autocomplete="given-name"
        required
        {autofocus}
      />
      <Button size="icon" type="submit" class="size-12">
        {#if busy}
          <Loader />
        {:else}
          <ArrowRight class="size-5" />
        {/if}
      </Button>
    </div>
  </fieldset>
</form>
