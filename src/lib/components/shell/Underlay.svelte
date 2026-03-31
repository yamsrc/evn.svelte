<script lang="ts">
  import { standalone, shell, ios, safari } from '$lib/tools'
  import type { Props } from './Underlay'

  const { direction, class: classes, ...rest }: Props = $props()

  const app = standalone || shell
  const safariBrowser = ios && safari && !app
</script>

<div
  class={[
    'bg-background/80',
    `mask-[linear-gradient(to_${direction},transparent_0%,black_2rem)]`,
    safariBrowser && 'hidden',
    classes,
  ]}
  {...rest}>
</div>
