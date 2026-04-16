<script lang="ts">
  import { dict } from '@/notifications/ui/intl'
  import { Slide } from '@/app/ui'
  import type { Props } from './Created'

  // if Props unused, types look weird. Add fake usage for cleaner types
  const { notification: _ }: Props = $props()
  // svelte-ignore state_referenced_locally
  void _
</script>

<div class="p-4 flex items-center justify-between gap-4">
  <span>{$dict.accounts.created.welcome}</span>
  <div class="flex items-center justify-end gap-1 shrink-0 text-muted-foreground text-sm max-w-2/5">
    <Slide>{$dict.accounts.created.hint}</Slide>
  </div>
</div>
