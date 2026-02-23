<script lang="ts">
  import { CircleX } from '@lucide/svelte'
  import { dict } from '$lib/intl'
  import Content from '@/app/ui/cosmetics/Content.svelte'
  import Root from '@/app/ui/cosmetics/Root.svelte'

  interface Props {
    class?: string
  }

  const { class: classes }: Props = $props()
</script>

<Root class={classes}>
  <Content>
    <CircleX class="text-muted-foreground rounded-full size-[150px]" />
    <p class="text-center text-3xl font-bold text-muted-foreground">{$dict.account.deleted}</p>
  </Content>
</Root>
