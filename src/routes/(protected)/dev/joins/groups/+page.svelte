<script lang="ts">
  import { having } from 'svas'
  import { account, named } from '@/iam'
  import { Panel } from '@/groups/ui'
  import { invitations } from '@/groups'
  import { Section } from '@/app/ui'
  import { Button, buttonVariants } from '$ui/button'
  import * as AlertDialog from '$ui/alert-dialog'
  import { goto } from '$app/navigation'
  import type { PageData } from './$types.js'

  const { data }: { data: PageData } = $props()
  const group = $derived(data.group)

  let open = $state(true)

  async function onaccept() {
    if (!group) return

    open = false

    await having(account)
    await named()

    const res = await invitations.accept(group.id)

    if (res instanceof Error) open = true
    else goto('/dev/components/joins/')
  }
</script>

{#if !group}
  <Section class="py-4">
    <!-- TODO: i18n -->
    <a href="/contacts/groups/editor/">Create group</a>
  </Section>
{:else}
  <AlertDialog.Root {open}>
    <AlertDialog.Content escapeKeydownBehavior="ignore">
      <AlertDialog.Header>
        <AlertDialog.Title>
          <!-- TODO: i18n -->
          <h2>Join {group.name}</h2>
        </AlertDialog.Title>
        <AlertDialog.Description />
      </AlertDialog.Header>
      <Panel {group} />
      <AlertDialog.Footer class="flex-row">
        <AlertDialog.Cancel
          class={[buttonVariants({ size: 'lg', variant: 'secondary' }), 'flex-1']}
          onclick={() => goto('/dev/components/joins/')}>
          <!-- TODO: i18n -->
          Decline
        </AlertDialog.Cancel>
        <Button id="dev-joins-groups-accept-button" size="lg" class="flex-1" onclick={onaccept}>
          <!-- TODO: i18n -->
          Join
        </Button>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
{/if}
