<script lang="ts">
  import { Separator } from '$com/separator'
  import * as Card from '$ui/card'
  import { Switch } from '$ui/switch'
  import { configure, permissions, key } from '@/transmission'
  import { scopes } from './Scopes'
  import { dict } from './intl'
  import type { Scope } from '@/transmission'

  let busy = $state(false)
  const all = $derived(!scopes.every((s) => $permissions?.[key(s)] === false))

  function checked(scope: Scope): boolean {
    return $permissions?.[key(scope)] !== false
  }

  async function toggleAll(value: boolean) {
    const update = Object.fromEntries(scopes.map((s) => [key(s), value]))

    busy = true
    await configure(update)
    busy = false
  }

  async function toggle(scope: Scope, value: boolean) {
    const k = key(scope)

    busy = true
    await configure({ [k]: value })
    busy = false
  }
</script>

<Card.Root class="bg-background p-4" style="view-transition-name: transmission-settings;">
  <Card.Content class="space-y-2 p-0">
    <div class="space-y-1">
      <div class="flex justify-between items-center gap-2">
        <h2><label for="transmission-settings-switch">{$dict.settings.title}</label></h2>
        <Switch
          id="transmission-settings-switch"
          checked={all}
          onCheckedChange={toggleAll}
          class="border border-border"
          disabled={busy} />
      </div>
      <p class="text-sm text-muted-foreground">{$dict.settings.description}</p>
    </div>
    {#if all}
      {#each scopes as scope, i (scope.domain)}
        <Separator />
        <div class="ps-2">
          <label for={`transmission-settings-${scope.domain}-switch`}>
            <div class="flex justify-between items-center gap-2">
              <h3>{$dict.settings[scope.domain].title}</h3>
              <Switch
                id={`transmission-settings-${scope.domain}-switch`}
                checked={checked(scope)}
                onCheckedChange={(v) => toggle(scope, v)}
                class="border border-border"
                disabled={busy} />
            </div>
            <p class="text-sm text-muted-foreground">
              {$dict.settings[scope.domain].description}
            </p>
          </label>
        </div>
      {/each}
    {/if}
  </Card.Content>
</Card.Root>
