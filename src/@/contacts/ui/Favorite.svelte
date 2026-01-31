<script lang="ts">
  import { Star } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Action } from '@/app/ui'
  import { favorites, add, del } from '@/favorites'
  import type { Props } from './Favorite'
  import type { Favorite } from '@/favorites'

  const { contact }: Props = $props()

  let busy = $state(false)

  async function toggle(favorite: Favorite | undefined) {
    if (busy) return

    busy = true

    if (favorite) await del(favorite.id)
    else await add(contact.identity)

    busy = false
  }
</script>

<Async store={favorites}>
  {#snippet awaited(favorites)}
    {@const favorite = favorites.find((f) => f.favorite === contact.identity)}
    <Action
      variant={favorite ? 'default' : 'secondary'}
      onclick={() => toggle(favorite)}
      class={[busy && 'opacity-75']}>
      <Star fill={favorite ? 'currentColor' : 'none'} />
    </Action>
  {/snippet}
</Async>
