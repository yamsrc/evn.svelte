<script lang="ts">
  import { createContext, setContext, type Context, type Props } from './Context'

  const { value, children }: Props = $props()

  // svelte-ignore state_referenced_locally
  const ctx = $state<Context>(createContext(value))

  setContext(ctx)
</script>

{@render children()}
