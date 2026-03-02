<script lang="ts">
  import { Button } from '$ui/button'
  import type { Props } from './Item'

  const { children, onclick, id, class: classes }: Props = $props()
</script>

<Button
  {id}
  {onclick}
  variant="ghost"
  class={['text-base font-normal px-3.5 has-[>svg]:px-3.5 py-2.5', classes]}>
  {@render children()}
</Button>
