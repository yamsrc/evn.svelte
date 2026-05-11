<script lang="ts">
  import { presets, upload } from '@/groups'
  import { Gallery } from '@/app/ui'
  import { dict } from './intl'
  import type { Props } from './Cover'

  let { picture = $bindable(''), onchange }: Props = $props()
</script>

<div class="space-y-2">
  <h2>{$dict.cover}</h2>
  <Gallery
    bind:picture
    {presets}
    {upload}
    variant="700x500"
    card="aspect-[1.4]"
    placement="start"
    vt="group-cover"
    onpick={onchange} />
</div>
