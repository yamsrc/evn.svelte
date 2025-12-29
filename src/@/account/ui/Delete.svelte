<script lang="ts">
  import { Hold } from '$com/hold'
  import { dict } from '$lib/intl'
  import { cn } from '$lib/utils'
  import { buttonVariants } from '$ui/button'
  import * as Dialog from '$ui/dialog'
  import { terminate } from '@/account'
  import type { Props } from './Delete'

  const { ondelete, class: classes }: Props = $props()

  async function del() {
    const err = await terminate()

    if (err instanceof Error) return

    ondelete?.()
  }
</script>

<Dialog.Root>
  <Dialog.Trigger class={cn(buttonVariants({ variant: 'ghost' }), classes)}>
    {$dict.account.delete.button}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>
        {$dict.account.delete.title}
      </Dialog.Title>
      <Dialog.Description class="text-balance">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html $dict.account.delete.description}
      </Dialog.Description>
      <Dialog.Description class="text-balance">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html $dict.account.delete.sorry}
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer class="mt-8 flex-row justify-stretch">
      <Dialog.Close class={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'flex-1')}>
        {$dict.actions.cancel}
      </Dialog.Close>
      <Hold
        variant="destructive"
        size="lg"
        label={$dict.account.delete.hold}
        duration={5_000}
        position="top"
        align="center"
        onclick={del}
        class="flex-1 select-none"
      >
        {$dict.account.delete.button}
      </Hold>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
