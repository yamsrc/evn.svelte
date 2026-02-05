<script lang="ts">
  import { transit } from '$lib/tools'
  import { Switch } from '$ui/switch'
  import { scopes, type Scope } from './Scopes'
  import { dict } from './intl'

  let enabled = $state(true)

  function toggle(checked: boolean, scope?: Scope) {
    transit(() => (enabled = checked))
  }
</script>

<div class="space-y-2" style="view-transition-name: transmission-settings;">
  <div class="space-y-1">
    <div class="flex justify-between items-center gap-2">
      <h2><label for="transmission-settings-switch">{$dict.settings.title}</label></h2>
      <Switch
        id="transmission-settings-switch"
        checked={enabled}
        onCheckedChange={toggle}
        class="border border-border scale-125 me-1" />
    </div>
    <div>
      <p class="text-sm text-muted-foreground">{$dict.settings.description}</p>
    </div>
  </div>
  {#if enabled}
    <ul class="space-y-2 ps-2">
      {#each scopes as scope (scope)}
        <li>
          <label for={`transmission-settings-${scope}-switch`}>
            <div class="flex justify-between items-center gap-2">
              <h3>{$dict.settings[scope].title}</h3>
              <Switch id={`transmission-settings-${scope}-switch`} class="border border-border" />
            </div>
            <p class="text-sm text-muted-foreground">{$dict.settings[scope].description}</p>
          </label>
        </li>
      {/each}
    </ul>
  {/if}
</div>
