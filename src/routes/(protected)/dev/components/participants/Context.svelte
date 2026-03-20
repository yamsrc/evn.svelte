<script lang="ts">
  import { createContext, setContext, type Props, type Context } from './Context'

  const { value, children }: Props = $props()

  // svelte-ignore state_referenced_locally
  const ctx = $state<Context>(createContext(value))

  setContext(ctx)
</script>

{@render children()}
