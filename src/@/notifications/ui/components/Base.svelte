<script lang="ts">
  import { CircleArrowRight } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import type { Props } from './Base'

  const { href, children, class: classes }: Props = $props()
</script>

<Button
  {href}
  class={[
    'w-full h-fit p-4 has-[>svg]:p-4 font-normal text-pretty whitespace-normal justify-between',
    classes,
  ]}
  variant="ghost">
  {@render children()}
  {#if href}
    <CircleArrowRight
      color="black"
      fill="currentColor"
      class="text-accent dark:text-muted-foreground rtl:rotate-180" />
  {/if}
</Button>
