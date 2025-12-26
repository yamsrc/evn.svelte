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

## Linked Entities Pattern

The Linked Entities Pattern is used to create rich domain models by composing data from multiple domains. This pattern enhances network-defined entities with related domain data, creating a more complete representation for application use.

### Pattern Overview

A linked entity extends a network model (from `net/`) with references to related entities from other domains:

```typescript
// Network model (raw API data) - defined in svc/net/Contact.ts
export interface Contact {
  id: string
  identities: [string, string]
  balance: number
  _created: number
  _version: number
}

// Linked entity (enriched domain model) - defined in svc/Contact.ts
export interface Contact extends net.Contact {
  identity: string      // Derived field
  account: Account      // Linked entity from @/account domain
}
```

### Implementation Pattern

**Mapping Function (`map.ts`)**:

The mapping function transforms network entities into linked entities by:
1. Extracting relevant data from the network model
2. Fetching related entities from other domains
3. Combining them into a rich domain model

```typescript
import { awaited, having } from 'svas'
import { accounts } from '@/account'
import { account } from '@/iam'

export async function map(entry: net.Contact): Promise<Contact | Error> {
  const me = await having(account)  // Wait for current user's account
  const identity = me.id === entry.identities[0] ? entry.identities[1] : entry.identities[0]
  const they = await awaited(accounts.get(identity))  // Fetch linked Account entity
  
  if (they instanceof Error) return they
  
  return {
    ...entry,
    identity,
    account: they,  // Linked Account entity from @/account domain
  }
}
```

**Store Integration (`store.ts`)**:

The domain store uses the mapping function to transform network data into linked entities:

```typescript
export const internal = collection<Contact>({
  get,
  persist: 'contacts:contacts',
  bind: account,
  stale: true,
  values: values<Contact>(),
})

events.on('default.contacts.sync', async (entry: net.Contact) => {
  const contact = await map(entry)  // Transform to linked entity
  if (contact instanceof Error) return
  sync(internal, contact)
})
```

### Benefits

- **Separation of Concerns**: Network models (`net/`) remain clean API representations
- **Rich Domain Models**: Application logic works with complete, meaningful entities
- **Type Safety**: TypeScript ensures proper composition of linked entities
- **Reusability**: Linked entities can reference shared domain models (e.g., `Account`)
- **Maintainability**: Changes to related domains are automatically reflected through references

### Usage Guidelines

- Use linked entities when a domain model needs data from other domains
- Keep network models (`net/`) as pure API representations
- Implement mapping in a dedicated `map.ts` file
- Handle errors gracefully when fetching linked entities
- Consider caching strategies for frequently accessed linked entities
