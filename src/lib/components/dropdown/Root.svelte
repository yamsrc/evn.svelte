<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { transit } from '$lib/tools/transition'
  import { setContext, type Context } from './Context'
  import type { Props } from './Root'

  const { children, onopen }: Props = $props()

  const id = `am-${crypto.randomUUID()}`
  let opened = $state(false)
  let layers = $state<string[]>([])
  let contentRef = $state<HTMLDivElement | undefined>()
  let triggerRef = $state<HTMLDivElement | undefined>()

  const ctx: Context = {
    get opened() {
      return opened
    },
    open: () => {
      onopen?.(true)
      transit(() => (opened = true))
    },
    close: () => {
      onopen?.(false)

      transit(() => {
        opened = false
        layers = []
      })
    },
    get id() {
      return id
    },
    setContentRef: (el) => (contentRef = el),
    setTriggerRef: (el) => (triggerRef = el),
    push: (name: string) =>
      transit(() => {
        layers = [...layers, name]
      }),
    pop: () =>
      transit(() => {
        layers = layers.slice(0, -1)
      }),
    get layer() {
      return layers.at(-1) ?? ''
    },
  }

  setContext(ctx)

  export function open() {
    ctx.open()
  }

  export function close() {
    ctx.close()
  }

  onMount(() => {
    function handle(e: MouseEvent) {
      if (!opened) return

      const target = e.target as Node

      if (triggerRef?.contains(target) || contentRef?.contains(target)) return

      e.preventDefault()
      e.stopPropagation()

      onopen?.(false)

      transit(() => {
        opened = false
        layers = []
      })
    }

    document.addEventListener('click', handle, { capture: true })

    return () => document.removeEventListener('click', handle, { capture: true })
  })

  onDestroy(() => onopen?.(false))
</script>

{@render children()}
