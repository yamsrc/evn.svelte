<script lang="ts">
  import { transit } from '$lib/tools'
  import Panel from '../Panel.svelte'
  import { hints } from './store'
  import { setContext } from './Context'
  import type { Props } from './Root'

  const { key, delay, name, class: classes, children }: Props = $props()

  const entry = $derived($hints?.[key])
  const hidden = $derived(
    entry === true || (typeof entry === 'number' && delay != null && Date.now() - entry < delay),
  )

  let dismissing = $state(false)

  setContext({
    get dismissing() {
      return dismissing
    },
    later: () => transit(() => (dismissing = true)),
    dismiss: () => transit(() => hints.update((h) => ({ ...h, [key]: delay ? Date.now() : true }))),
  })
</script>

{#if !hidden}
  <Panel
    {name}
    class={[
      'w-full h-fit flex flex-col gap-3',
      'bg-muted border border-muted-foreground/20 rounded-lg',
      classes,
    ]}>
    {@render children()}
  </Panel>
{/if}
