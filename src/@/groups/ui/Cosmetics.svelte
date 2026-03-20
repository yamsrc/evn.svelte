<script lang="ts">
  import * as Cosmetics from '@/app/ui/cosmetics'
  import { dict } from '$lib/intl'
  import type { Props } from './Cosmetics'

  let { value = $bindable(), onchange, class: classes }: Props = $props()
</script>

<Cosmetics.Root class={['w-full', classes]}>
  <Cosmetics.Content class="items-stretch gap-2 w-full">
    <Cosmetics.Name
      class="w-full"
      bind:value={value.name}
      onchange={() => onchange?.(value.name)}
      placeholder={$dict.groups.name.placeholder} />
    <Cosmetics.Note>{$dict.groups.name.description}</Cosmetics.Note>
  </Cosmetics.Content>
</Cosmetics.Root>
