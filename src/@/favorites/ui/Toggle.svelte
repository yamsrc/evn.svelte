<script lang="ts">
  import { Star } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Button } from '$ui/button'
  import { favorites, add, del } from '@/favorites'
  import { dict } from './intl'
  import type { Props } from './Toggle'
  import type { Favorite } from '@/favorites'

  const { id, type }: Props = $props()

  let busy = $state(false)

  async function toggle(favorite: Favorite | undefined) {
    if (busy) return

    busy = true

    if (favorite) await del(favorite.id)
    else await add(id)

    busy = false
  }
</script>

<Async store={favorites}>
  {#snippet awaited(favorites)}
    {@const favorite = favorites.find((f) => f.favorite === id)}
    <Button
      id={`${type}-favorite-button`}
      variant="outline"
      size="icon"
      onclick={() => toggle(favorite)}
      disabled={busy}>
      <Star fill={favorite ? 'currentColor' : 'none'} />
      <span class="sr-only">{$dict.actions.favorite}</span>
    </Button>
  {/snippet}
</Async>
