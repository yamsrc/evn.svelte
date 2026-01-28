<script lang="ts">
  import { ChevronLeft } from '@lucide/svelte'
  import { dict } from '@/notifications/ui/intl'
  import type { Props } from './Created'

  // if Props unused, types look weird. Add fake usage for cleaner types
  const { notification: _ }: Props = $props()
  // svelte-ignore state_referenced_locally
  void _
</script>

<div class="p-4 flex items-center justify-between gap-4">
  <span>{$dict.accounts.created.welcome}</span>
  <div class="flex items-center justify-end gap-1 shrink-0 text-muted-foreground text-sm max-w-2/5">
    <div class="h-8 pl-1 flex items-center -space-x-2.5">
      <ChevronLeft size={16} class="text-muted-foreground rtl:rotate-180" />
      <ChevronLeft size={16} class="text-muted-foreground/75 rtl:rotate-180" />
      <ChevronLeft size={16} class="text-muted-foreground/50 rtl:rotate-180" />
      <ChevronLeft size={16} class="text-muted-foreground/25 rtl:rotate-180" />
    </div>
    <span class="text-balance">{$dict.accounts.created.hint}</span>
  </div>
</div>
