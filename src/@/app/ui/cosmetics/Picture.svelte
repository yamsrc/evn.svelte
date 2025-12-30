<script lang="ts">
  import { Picture } from '@/media/ui'
  import type { Props } from './Picture'

  const { id = $bindable(), onchange }: Props = $props()

  ;(() => {
    // not yet implemented; suppress warning
    void onchange
  })()
</script>

<div class="flex justify-center">
  <Picture {id} alt={id} variant="300x300!" width={150} height={150} class="rounded-full" />
</div>
