<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { transit } from '$lib/tools/svt'
  import { setContext } from './Context'
  import type { Props } from './Root'

  const { children, onopen }: Props = $props()

  const id = `am-${crypto.randomUUID()}`
  let open = $state(false)
  let contentRef = $state<HTMLDivElement | undefined>()
  let triggerRef = $state<HTMLDivElement | undefined>()

  setContext({
    get opened() {
      return open
    },
    open: () => {
      onopen?.(true)
      transit(() => (open = true))
    },
    close: () => {
      onopen?.(false)
      transit(() => (open = false))
    },
    get id() {
      return id
    },
    setContentRef: (el) => (contentRef = el),
    setTriggerRef: (el) => (triggerRef = el),
  })

  onMount(() => {
    function handle(e: MouseEvent) {
      if (!open) return

      const target = e.target as Node

      if (triggerRef?.contains(target) || contentRef?.contains(target)) return

      e.preventDefault()
      e.stopPropagation()

      onopen?.(false)
      transit(() => (open = false))
    }

    document.addEventListener('click', handle, { capture: true })

    return () => document.removeEventListener('click', handle, { capture: true })
  })

  onDestroy(() => onopen?.(false))
</script>

{@render children()}
