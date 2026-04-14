<script lang="ts">
  import { Archive } from '@lucide/svelte'
  import { ago } from '$lib/tools'
  import { locale } from '$lib/intl'
  import { dict } from './intl'
  import type { Props } from './Archived'

  const { at }: Props = $props()
</script>

<p class="flex items-center gap-1.5 text-sm font-bold">
  <Archive class="size-4" />
  <span>{$dict.archived} {ago(at, $locale)}</span>
</p>
