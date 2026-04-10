<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Props } from './Section'

  const { children, class: classes, ...rest }: Props = $props()
</script>

<section class={cn('px-5 max-w-2xl w-full mx-auto', classes)} {...rest}>
  {@render children()}
</section>
