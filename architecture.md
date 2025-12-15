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
