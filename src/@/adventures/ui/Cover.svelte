<script lang="ts">
  import { Gallery } from '@/app/ui'
  import { presets, upload } from '@/adventures'
  import { dict } from './intl'
  import type { Props } from './Cover'

  let { picture = $bindable(''), onchange }: Props = $props()
</script>

<div class="space-y-2">
  <h2>{$dict.editor.cover}</h2>
  <Gallery
    bind:picture
    {presets}
    {upload}
    variant="700x500"
    card="aspect-[1.4]"
    placement="start"
    onpick={onchange} />
</div>
