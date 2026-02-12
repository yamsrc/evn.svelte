<script lang="ts">
  import { createContext, setContext, type Props, type Context } from './Context'

  const { value, draft, children }: Props = $props()

  // svelte-ignore state_referenced_locally
  const ctx = $state<Context>(createContext(value, draft))

  setContext(ctx)
</script>

{@render children()}
