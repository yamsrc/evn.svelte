<script lang="ts">
  import { configure, permissions, key } from '@/transmission'
  import { Panel } from '@/app/ui'
  import { Switch } from '$ui/switch'
  import { Separator } from '$com/separator'
  import { dict } from './intl'
  import { scopes } from './Scopes'
  import type { Scope } from '@/transmission'

  const { class: classes }: { class?: string } = $props()

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

<Panel name="transmission-settings" class={classes}>
  <div class="space-y-1">
    <div class="flex justify-between items-center gap-2">
      <h2 style="view-transition-name: me-notifications-title;">
        <label for="transmission-settings-switch">{$dict.settings.title}</label>
      </h2>
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
    {#each scopes as scope (scope.domain)}
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
</Panel>
