<script lang="ts">
  import { cn } from '$lib/utils'
  import { standalone, safari } from '$lib/tools/mq'
  import type { Props } from './Screen'

  const { children, unsafe = false, class: classes }: Props = $props()
</script>

<div
  class={cn(
    'flex flex-col',
    standalone && safari ? 'min-h-screen' : 'min-h-dvh',
    unsafe ||
      'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]',
    classes,
  )}>
  <div class="flex-1 flex flex-col space-y-5 pt-2 tim:pt-0">
    {@render children()}
  </div>
</div>
