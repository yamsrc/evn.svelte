<script lang="ts">
  import { cn } from '$lib/utils'
  import { Picture } from '@/media/ui'
  import type { Props } from './Picture'

  const { id = $bindable(), onchange, class: classes }: Props = $props()

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
  loading="lazy" />
