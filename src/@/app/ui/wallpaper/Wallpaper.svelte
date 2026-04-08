<script lang="ts">
  import { Crown } from '@lucide/svelte'
  import { account } from '@/iam'
  import * as Tabs from '$ui/tabs'
  import { dict } from '$lib/intl'
  import Effects from '../Effects.svelte'
  import Picture from './Picture.svelte'
  import Pattern from './Pattern.svelte'

  let method = $state<'pattern' | 'picture'>($account?.wallpaper?.method ?? 'pattern')
</script>

<Tabs.Root value={method} onValueChange={(v) => (method = v === 'picture' ? 'picture' : 'pattern')}>
  <Tabs.List class="grid grid-cols-2 w-full h-12">
    <Tabs.Trigger value="pattern">{$dict.profile.background.pattern}</Tabs.Trigger>
    <Tabs.Trigger value="picture">
      <Crown class="text-muted-foreground" fill="currentColor" />
      {$dict.profile.background.picture}
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="pattern" class="space-y-2 aspect-square">
    <div class="border h-40 rounded-lg bg-background overflow-hidden">
      <Pattern scrollable />
    </div>
    <Effects />
  </Tabs.Content>
  <Tabs.Content value="picture" class="aspect-square">
    <Picture />
  </Tabs.Content>
</Tabs.Root>
