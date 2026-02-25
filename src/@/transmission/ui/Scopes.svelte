<script lang="ts">
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

<div class="space-y-2" style="view-transition-name: transmission-settings;">
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
    <ul class="space-y-2 ps-2">
      {#each scopes as scope (scope.domain)}
        <li>
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
        </li>
      {/each}
    </ul>
  {/if}
</div>
