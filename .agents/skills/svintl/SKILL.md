---
name: svintl
description: >
  svintl CLI for i18n — translations, locales, pluralization, mounts, building typed dictionaries. Triggers on `npx intl`, YAML locale files, intl directories, or any translation/i18n work in Svelte projects.
---

# svintl — i18n for Svelte

CLI tool for managing internationalization dictionaries with automatic translation via OpenAI.

## Core Rule

**NEVER edit intl files directly** — all `*.yaml`, `built.js`, `types.ts` in intl directories are generated. Always use `npx intl` CLI commands.

## CLI Commands

```bash
npx intl hola                               # init dictionaries (default: src/lib/intl/)
npx intl hola -p ./custom/path              # init at custom path
npx intl add key.path "Value" "context"     # add new key (errors if exists), context optional
npx intl add key.path "Value" --debug        # optional: print OpenAI request before API call
npx intl set key.path "Updated value"       # update existing key
npx intl set key.path "Value" --debug       # same (--debug on add/set)
npx intl set "mount/key.path" "Value"       # set in mount
npx intl const key.path "Same everywhere"   # same value across all locales (no translation)
npx intl unit items.count "item"            # pluralized entry (auto-generates plural forms)
npx intl move old.key new.key               # rename key/branch
npx intl del key.path                       # delete key/branch
npx intl create es                          # new locale (BCP 47 tag, auto-translates)
npx intl destroy es                         # delete locale
npx intl mount foo ./any/path               # create empty mount
npx intl import foo ./any/path              # adopt existing dict dir as mount, reconcile locales
npx intl unmount foo                        # remove mount (keeps files)
npx intl context "Project description"      # set project-wide translation guidance
npx intl context --clear                    # clear project context
npx intl genders he she none                # enable gender-aware translations (list the gender values)
npx intl genders                            # print current gender values
npx intl sync en                            # re-translate all from source (EXPENSIVE — avoid)
npx intl sync en key.path                   # re-translate specific key
npx intl build                              # rebuild JS/TS from YAML
```

## Dictionary Format

YAML with arbitrary nesting, strings at leaves:

```yaml
native: English
example:
  hello: "Hello world"
```

Usage: `{$dict.example.hello}`

### Dynamic Values — Placeholders

For simple cases the CLI auto-generates `!js` functions from placeholder syntax — no need to write them manually:

```bash
npx intl set greeting "Hello, {name}!"            # {name} → function param
npx intl set joined "[names] joined {groupName}"  # [names] → Intl.ListFormat
```

For complex logic, pass `!js` functions via `intl set`:

```bash
npx intl set greeting '!js (count) => `${count || "No"} item${count === 1 ? "" : "s"}`'
```

Usage in components: `{$dict.greeting(user.name)}`

### Pluralization

Use `npx intl unit` — generates `Intl.PluralRules`-based functions:

```bash
npx intl unit items.count "item"
```

Produces:
```yaml
items:
  count:
    - one: item
      other: items
```

Usage: `{$dict.items.count(count)}`

Complex locales (Russian, Arabic) auto-get `few`, `many`, etc.

### Genders

When enabled (`npx intl genders he she none`), gender-dependent phrases become functions whose **last** argument is the gender (`'he' | 'she' | 'none'`) — the phrase's own arguments come first, e.g. `(name, gender) => …`. The listed values become the generated `Grammar` union.

## Mounts

Organize translations into separate directories:

```bash
npx intl mount admin ./src/features/admin/intl
npx intl set "admin/dashboard.title" "Admin Dashboard"
```

Mount keys use `{mount}/` prefix in CLI commands.

`mount` scaffolds an empty mount; `import` adopts a populated dir (with its own `context.yaml`) and reconciles its locales to the root — drops languages the root lacks, generates ones it lacks (translating the imported `inputs`), leaves shared locales untouched.

## Import Pattern

**Root dictionary:**
```svelte
<script lang="ts">
  import { dict, locale } from '$lib/intl'
</script>
<h1>{$dict.example.hello}</h1>
```

**Mount dictionary:**
```svelte
<script lang="ts">
  import { dict } from './intl'
</script>
<h1>{$dict.dashboard.title}</h1>
```

**Mount's `intl/index.ts`:**
```typescript
import { derived } from 'svelte/store'
import { locale } from '$lib/intl'
import { dictionaries } from './built.js'
import type { Locale, Dictionary } from './types'

const dict = derived(locale, ($locale) => dictionaries[$locale])
export { dict, dictionaries, locale }
export type { Locale, Dictionary }
```

## Context for Translation Accuracy

```bash
npx intl set app.welcome "Welcome" "greeting shown on homepage"
npx intl context "B2B SaaS for enterprise users"
```

Context is stored in `context.yaml` and used by OpenAI when creating new locales.

## Workflow

1. Use `npx intl set/unit/const` to add/update translations
2. Run `npx intl build` to generate JS/TS (often auto-runs)
3. Import `dict` store in components
4. Use `$dict.key.path` in templates

## Avoid

- **Direct YAML editing** — always use CLI
- **`npx intl sync`** — expensive API calls, rarely needed
- **Non-BCP47 locale codes** — must be valid tags like `en-US`, `es`, `pt-BR`
