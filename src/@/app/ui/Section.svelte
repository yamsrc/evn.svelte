<script lang="ts">
  import type { Props } from './Section'

  const { children, class: classes, id }: Props = $props()
</script>

<section {id} class="px-5 max-w-[1440px] w-full mx-auto {classes}">
  {@render children()}
</section>
