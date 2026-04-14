<script lang="ts">
  import { ArrowRight } from '@lucide/svelte'
  import * as Cosmetics from '@/app/ui/cosmetics'
  import { pickpic } from '@/accounts'
  import { update, type Account } from '@/accounts'
  import { Button } from '$ui/button'
  import { dict } from '$lib/intl'

  const { account, autofocus }: { account: Account; autofocus?: boolean } = $props()

  // svelte-ignore state_referenced_locally
  let name = $state<string>(account.name ?? '')
  // svelte-ignore state_referenced_locally
  let picture = $state<string>(account.picture ?? pickpic())
  let busy = $state(false)

  async function save(value: { name: string; picture: string }) {
    busy = true
    await update(account.id, { name: value.name, picture: value.picture })
    busy = false
  }

  async function submit() {
    if (busy || name.trim() === '') return

    await save({ name, picture })
  }
</script>

<Cosmetics.Root class="flex flex-col justify-between">
  <Cosmetics.Content>
    <Cosmetics.Picture bind:id={picture} />
    <div class="space-y-2">
      <Cosmetics.Name
        bind:value={name}
        bind:busy
        placeholder={$dict.form.enterName}
        {autofocus}
        autocomplete="given-name"
        onchange={submit}
      />
      <Cosmetics.Note>{$dict.onboarding.name.description}</Cosmetics.Note>
    </div>
  </Cosmetics.Content>
  <Cosmetics.Actions label={$dict.actions.continue} {busy}>
    <Button size="lg" class="w-full" disabled={busy || !name.trim()} onclick={submit}>
      {$dict.actions.continue}
      <ArrowRight size={16} />
    </Button>
  </Cosmetics.Actions>
</Cosmetics.Root>
