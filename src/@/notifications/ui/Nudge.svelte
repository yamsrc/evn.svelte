<script lang="ts">
  import { Button } from '$ui/button'
  import { permission, request } from '@/transmission'
  import { dict } from './intl'
  import type { Props } from './Nudge'

  const { class: classes }: Props = $props()
</script>

{#if $permission !== 'denied'}
  <div
    class={[
      'w-full',
      'bg-muted border border-muted-foreground/20 rounded-lg',
      'p-4 flex flex-col gap-3',
      classes,
    ]}>
    <p class="text-sm">{$dict.nudge.prompt}</p>
    <Button class="w-fit" onclick={request}>
      {$dict.nudge.button}
    </Button>
  </div>
{/if}
