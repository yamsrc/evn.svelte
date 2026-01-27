<script lang="ts">
  import type { Props } from './Slide'

  const { children, class: classes }: Props = $props()
</script>

<div class={['flex items-center gap-2 text-muted-foreground', classes]}>
  <img src="/pictures/slide.svg" alt="Slide" width={32} height={20} />
  {@render children()}
</div>
