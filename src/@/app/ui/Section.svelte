<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Props } from './Section'

  const { children, class: classes, id }: Props = $props()
</script>

<section {id} class={cn('px-5 max-w-2xl w-full mx-auto', classes)}>
  {@render children()}
</section>
