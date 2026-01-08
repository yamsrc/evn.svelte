<script lang="ts">
  import { setContext } from 'svelte'
  import { context, type Props, type Context } from './Context'

  const { value, children }: Props = $props()

  // svelte-ignore state_referenced_locally
  const ctx = $state<Context>(context(value))

  setContext('editor', ctx)
</script>

{@render children()}
