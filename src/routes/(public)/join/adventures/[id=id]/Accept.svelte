<script lang="ts">
  import { having } from 'svas'
  import { goto } from '$app/navigation'
  import { dict } from '$lib/intl/join'
  import { cn } from '$lib/utils'
  import * as AlertDialog from '$ui/alert-dialog'
  import { Button, buttonVariants } from '$ui/button'
  import { Picture } from '@/accounts/ui'
  import { invitations } from '@/adventures'
  import { Avatars } from '@/app/ui'
  import { account, named } from '@/iam'
  import { url } from '@/media/ui/Picture'
  import type { Props } from './Accept'

  let {
    adventure,
    inviter,
    accepted = $bindable(false),
    error = $bindable(false),
  }: Props = $props()

  let open = $state(true)

  // svelte-ignore state_referenced_locally
  const cover = url({
    id: adventure.picture,
    path: '/pictures/',
    variant: '600x400!',
    format: 'jpeg',
  })

  async function onclick() {
    open = false

    await having(account)
    await named()

    const res = await invitations.accept(adventure.id)

    if (res instanceof Error) error = true
    else accepted = true
  }
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Content escapeKeydownBehavior="ignore">
    <AlertDialog.Header>
      <AlertDialog.Title>
        <h2>{$dict.adventures.dialog.heading}</h2>
      </AlertDialog.Title>
      <AlertDialog.Description />
    </AlertDialog.Header>

    {#if inviter}
      <div class="flex flex-col items-center gap-3">
        <Picture account={inviter} class="size-24" />
        <p class="text-center text-muted-foreground">
          {$dict.adventures.dialog.description(inviter.name, inviter.grammar)}
        </p>
      </div>
    {/if}

    <div
      class="relative isolate overflow-hidden rounded-lg bg-cover bg-center p-3"
      style="background-image: url({cover})">
      <div class="relative z-10 flex flex-col gap-1.5">
        <span class="font-bold">{adventure.title}</span>
        <Avatars identities={adventure.identities} />
      </div>
      <div class="absolute inset-0 bg-background/70 backdrop-blur-[0.5px]"></div>
    </div>

    <AlertDialog.Footer class="flex-row">
      <AlertDialog.Cancel
        class={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'flex-1')}
        onclick={() => goto('/')}>
        {$dict.adventures.dialog.decline}
      </AlertDialog.Cancel>
      <Button id="join-adventure-accept-button" size="lg" class="flex-1" {onclick}>
        {$dict.adventures.dialog.join}
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
