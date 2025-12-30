<script lang="ts">
  import { dict } from '$lib/intl'
  import { Cosmetics, type Value } from '@/app/ui'
  import { update } from '@/groups'
  import type { Props } from './Cosmetics'

  const { id, name }: Props = $props()

  async function onchange(value: Value) {
    await update(id, { name: value.name })
  }
</script>

<Cosmetics value={{ name }} note={$dict.groups.name.description} {onchange} />
