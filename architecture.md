# Architecture

## Domain Organization

The codebase follows a domain-driven design pattern with each domain organized under `src/@/`. Each domain contains standardized layers:

### Domain Structure Pattern

```plaintext
src/@/{domain}/
├── index.ts          # Main domain entry point
├── svc/              # Services layer (business logic)
│   ├── index.ts      # Services entry point
│   ├── store.ts      # Data persistence & state management
│   └── net/          # Network layer
│       ├── index.ts  # Network exports
│       ├── interface.ts  # API interfaces
│       └── {Model}.ts    # Data models & types
└── ui/               # UI layer (components)
    ├── index.ts      # UI exports
    ├── ui.ts         # Transient UI state
    └── {Component}.svelte  # Svelte components
```

### Layer Responsibilities

**Services Layer (`svc/`)**:

- **`store.ts`**: Manages domain state using `svas` collections, handles persistence and data binding
- **`net/interface.ts`**: Defines API interfaces using Resource pattern for HTTP communication
- **`net/{Model}.ts`**: Contains TypeScript interfaces, types, and constants for domain models
- **`index.ts`**: Exports public service APIs

**UI Layer (`ui/`)**:

- Contains Svelte components that consume services
- Components import domain services via `@/{domain}` alias
- **`index.ts`**: Exports reusable UI components
- Transient UI state is managed in `ui.ts` file

### App Domain

Some UI components are intended to be reused across multiple screens within this application, but their implementation is still application-bound (e.g., depends on app routing, app stores, domain models, product rules, or app-specific copy/branding). These components should live in the dedicated `app` domain.

## Shared Components

Shared components are app-agnostic UI building blocks. Everything in `src/lib/components/` must be reusable across different apps without modification.

A component belongs here only if its implementation is not bound to the current application, meaning it:
• does not depend on app-specific routes, screens, or domain concepts
• does not import from domains
• does not embed product copy, branding, or business rules
• exposes configuration via props / slots / events, rather than hardcoding behavior

```plaintext
src/lib/components/
├── section/
│   ├── index.ts
│   ├── Section.svelte
│   └── Section.ts
└── shell/
    ├── index.ts
    ├── Nav.svelte
    ├── Nav.ts
    ├── Screen.svelte
    └── Screen.ts
```

## Svelte Components

### EntityLike props

Components that accept entities should declare an EntityLike interface in their props, including only the properties they require. This improves component reusability and reduces coupling.

Example:

```ts
type AccountLike = Pick<Account, 'name' | 'picture'>

export interface Props {
  account: AccountLike
}
```

## Linked Entities Pattern

The Linked Entities Pattern is used to create rich domain models by composing data from multiple domains. This pattern enhances network-defined entities with related domain data, creating a more complete representation for application use.

### Pattern Overview

A linked entity extends a network model (from `net/`) with references to related entities from other domains:

```typescript
// Network model (raw API data) - defined in svc/net/Contact.ts
export interface Contact {
  id: string
  identity: string
}

// Linked entity (enriched domain model) - defined in svc/Contact.ts
export interface Contact extends net.Contact {
  account: Account // Linked entity from @/account domain
}
```

### Implementation Pattern

**Mapping Function (`map.ts`)**:

The mapping function transforms network entities into linked entities by:

1. Extracting relevant data from the network model
2. Fetching related entities from other domains
3. Combining them into a rich domain model

```typescript
import { awaited } from 'svas'
import { accounts } from '@/accounts'

export async function map(entry: net.Contact): Promise<Contact | Error> {
  const account = await awaited(accounts.get(entry.identity)) // Fetch linked Account entity

  if (account instanceof Error) return account

  return {
    ...entry,
    account, // Linked Account entity from @/account domain
  }
}
```

**Store Integration (`store.ts`)**:

The domain store uses the mapping function to transform network data into linked entities:

```typescript
export const internal = collection<Contact>({ get })

events.on('default.contacts.sync', async (entry: net.Contact) => {
  const contact = await map(entry)

  if (contact instanceof Error) return

  sync(internal, contact)
})
```

### Benefits

- **Separation of Concerns**: Network models (`net/`) remain clean API representations
- **Rich Domain Models**: Application logic works with complete, meaningful entities
- **Reusability**: Linked entities can reference shared domain models (e.g., `Account`)
- **Maintainability**: Changes to related domains are automatically reflected through references
