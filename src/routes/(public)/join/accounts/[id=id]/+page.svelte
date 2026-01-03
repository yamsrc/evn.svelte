<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { dict } from '$lib/intl/join'
  import * as AlertDialog from '$ui/alert-dialog'
  import { Button, buttonVariants } from '$ui/button'
  import { Screen } from '@/app/ui'

  let open = $state(true)
</script>

<Screen>
  <h1>Hello World</h1>
  <p>{page.params.ref} {page.params.id}</p>
</Screen>

<AlertDialog.Root {open}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{$dict.account.title}</AlertDialog.Title>
      <AlertDialog.Description>
        <p class="text-balance!">{$dict.account.description}</p>
      </AlertDialog.Description>
    </AlertDialog.Header>
    <p>{$dict.account.content0}</p>
    <p>{$dict.account.content1}</p>
    <AlertDialog.Footer class="flex-row [&>button]:w-1/2">
      <AlertDialog.Cancel
        class={buttonVariants({ size: 'lg', variant: 'secondary' })}
        onclick={() => goto('/')}
      >
        {$dict.actions.discard}
      </AlertDialog.Cancel>
      <Button id="join-accounts-accept-button" size="lg" onclick={() => (open = false)}>
        {$dict.account.accept}
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
