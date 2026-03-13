<script lang="ts">
  import { Archive as ArchiveIcon } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import { dict } from './intl'
  import type { Props } from './Archive'

  const { id, empty }: Props = $props()
</script>

<div class="space-y-2">
  <h2>{$dict.finish.archive.title}</h2>
  <p class="text-sm text-muted-foreground">{$dict.finish.archive.description}</p>
  <Button
    variant="secondary"
    size="lg"
    class="w-full"
    disabled={empty}
    href={`/adventures/${id}/archive/`}>
    <ArchiveIcon />
    {$dict.finish.archive.button}
  </Button>
</div>
