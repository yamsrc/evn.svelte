<script lang="ts">
  import { standalone, safari } from '$lib/tools/mq'
  import { cn } from '$lib/utils'
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
  )}
>
  <div class="flex-1 flex flex-col">
    {@render children()}
  </div>
</div>
