<script lang="ts">
  import { Star } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Button } from '$ui/button'
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
    <Button
      id="contacts-favorite-button"
      variant="outline"
      size="icon"
      onclick={() => toggle(favorite)}
      disabled={busy}>
      <Star fill={favorite ? 'currentColor' : 'none'} />
    </Button>
  {/snippet}
</Async>
