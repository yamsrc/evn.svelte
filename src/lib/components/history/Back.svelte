<script lang="ts">
  import { ArrowLeft } from '@lucide/svelte'
  import { back } from './navigation'
  import type { Props } from './Back'

  const { children, href, name }: Props = $props()

  function onclick(event: MouseEvent) {
    event.preventDefault()

    back(href)
  }
</script>

<a {href} {onclick} class="flex items-center gap-1 text-muted-foreground -ml-1">
  <ArrowLeft class="size-4 rtl:rotate-180" />
  <span style={name ? `view-transition-name: ${name}` : undefined}>
    {@render children()}
  </span>
</a>
