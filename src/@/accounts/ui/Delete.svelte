<script lang="ts">
  import { Hold } from '$com/hold'
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import * as AlertDialog from '$ui/alert-dialog'
  import { buttonVariants } from '$ui/button'
  import { Spinner } from '$ui/spinner'
  import { terminate } from '@/accounts'
  import type { Props } from './Delete'

  const { ondelete, class: classes }: Props = $props()

  let open = $state(false)
  let busy = $state(false)

  async function del() {
    busy = true

    const err = await terminate()

    busy = false

    if (err instanceof Error) return

    open = false
    ondelete?.()
  }
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Trigger class={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), classes)}>
    {$dict.account.delete.link}
  </AlertDialog.Trigger>
  <AlertDialog.Content class="border border-destructive">
    <AlertDialog.Header>
      <AlertDialog.Title>
        {$dict.account.delete.title}
      </AlertDialog.Title>
      <AlertDialog.Description>
        <p>{$dict.account.delete.description}</p>
      </AlertDialog.Description>
      <AlertDialog.Description>
        <p>{$dict.account.delete.sorry}</p>
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <fieldset class="mt-8 flex gap-2" disabled={busy}>
        <AlertDialog.Cancel
          class={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-1/2')}
        >
          {$dict.actions.cancel}
        </AlertDialog.Cancel>

        <Hold
          variant="destructive"
          size="lg"
          class="w-full"
          containerClass="w-1/2"
          label={$dict.account.delete.hold}
          duration={5_000}
          position="top"
          align="center"
          onclick={del}
        >
          {#if busy}
            <Spinner />
          {:else}
            {$dict.account.delete.button}
          {/if}
        </Hold>
      </fieldset>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
