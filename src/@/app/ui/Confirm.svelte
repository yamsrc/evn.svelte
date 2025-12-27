<script lang="ts">
  import * as AlertDialog from '$com/ui/alert-dialog'
  import { buttonVariants } from '$com/ui/button'
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import type { Props } from './Confirm'

  let { title, description, confirm, open = $bindable(false), onconfirm }: Props = $props()
</script>

<AlertDialog.Root {open}>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content class="max-w-2xs">
      <AlertDialog.Title class="text-center">{title}</AlertDialog.Title>
      <AlertDialog.Description class="text-center">
        <p>{description}</p>
      </AlertDialog.Description>
      <div class="flex justify-stretch gap-2 w-full">
        <AlertDialog.Cancel
          class={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'flex-1')}
          onclick={() => (open = false)}
        >
          {$dict.actions.cancel}
        </AlertDialog.Cancel>
        <AlertDialog.Action
          onclick={onconfirm}
          class={cn(
            buttonVariants({ variant: 'destructive', size: 'lg' }),
            'flex-1 has-[>svg]:px-6',
          )}
        >
          {@render confirm()}
        </AlertDialog.Action>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
