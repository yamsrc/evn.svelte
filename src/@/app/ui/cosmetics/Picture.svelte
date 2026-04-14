<script lang="ts">
  import { Picture } from '@/media/ui'
  import { cn } from '$lib/utils'
  import type { Props } from './Picture'

  const { id = $bindable(), onchange, class: classes, style }: Props = $props()

  ;(() => {
    // not yet implemented; suppress warning
    void onchange
  })()
</script>

<Picture
  {id}
  alt={id}
  variant="300x300!"
  width={150}
  height={150}
  class={cn('rounded-full', classes)}
  {style}
  loading="lazy" />
