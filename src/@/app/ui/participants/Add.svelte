<script lang="ts">
  import { UserPlus } from '@lucide/svelte'
  import { dict } from '$lib/intl'
  import Button from './Button.svelte'
  import type { Props } from './Button'

  const { size = 'lg', variant = 'secondary', ...props }: Props = $props()
</script>

<Button {size} {variant} {...props}>
  <UserPlus />
  <span>{$dict.participants.add.button}</span>
</Button>
