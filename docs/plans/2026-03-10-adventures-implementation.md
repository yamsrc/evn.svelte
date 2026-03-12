# Adventures Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Use seed-svelte skill; load reference per Task Router before each task.

**Goal:** Full adventures feature — domain, UI, routes, expense editor integration, graph refactoring.

**Architecture:** New `@/adventures` domain following existing patterns (expenses, groups). Network types → store → services → UI. Adventure editor state/form/connectors live in `@/adventures/ui/Editor/`, routes under `src/routes/(private)/adventures/editor/[[id=id]]/` are orchestration-only. Shared infra: `@/contacts/ui/Leaderboard`, `$com/picker`, `$com/scrollable`. Adventure expenses are a standalone subsystem (`@/adventures/ui/expenses/`) with own form and details — not a mode of the regular expense editor. `Selector` component bridges navigation between regular and adventure expense flows.

**Tech Stack:** SvelteKit, svas, d3-force, svintl, Playwright BDD.

**Verification:** Run `npm run check && npm run lint` at the end of each phase before committing. Fix all errors before proceeding.

**Acceptance Testing:** Each UI phase (2–7) has an "Acceptance (Agent UI Testing)" checklist. After code passes verification, agent opens the app in a browser and manually verifies each item. This is agent-driven testing, not automated tests.

**Task Numbering:** Each phase has its own task numbering (Task 1, Task 2...) to avoid cascading renumbering.

---

## Task Index

### [Phase 1: Domain Foundation](adventures/phase-1-domain.md)

- [x] **Task 1:** Network Types — `Adventure`, `Expense` interfaces
- [x] **Task 2:** Network Interface — API client (`get`, `post`, `patch`, `add`, `put`, `del`, `expose`, `pictures`, `invitations`)
- [x] **Task 3:** Events & Store — realtime events, `adventures` collection, `get` helper
- [x] **Task 4:** Service Operations — `create`, `assign`, `add`, `expense`, `archive`, `leave`, `expose`, `invitations`, `pictures`
- [x] **Task 5:** Domain Exports — barrel exports, register realtime events

### [Phase 2: Adventure Editor Screen](adventures/phase-2-editor.md)

- [x] **Task 1:** i18n Mount — `npx intl mount` only (keys added per task)
- [x] **Task 2:** Extract Leaderboard Component — `@/contacts/ui/Leaderboard`, refactor Tops
- [x] **Task 3:** Members Component — wrapper over Leaderboard
- [x] **Task 4:** Port `finite()` to Scrollable
- [x] **Task 5:** Picker Compound Component — `$com/picker` (Root + Option)
- [x] **Task 6:** Cover Picker — preset covers + upload (depends on Task 5)
- [x] **Task 7:** Archive Section Component
- [x] **Task 8:** Adventure Editor Route — `/adventures/editor/[[id]]/`
- [x] **Task 9:** Add Members Route — `/adventures/editor/[[id]]/add/`

**Phase 2 actual deltas**

- Editor implementation ended up domain-local: `Context`, `Edit`, `Form` live in `src/@/adventures/ui/Editor/`; route files only hydrate context and compose screens.
- `@/contacts/ui/Leaderboard` became shared infra for adventure members and contact tops; implementation already supports optional `name?` override in entries.
- Picker/scroll infra is no longer future work: `$com/picker` and finite `Scrollable` shipped as shared primitives and should be reused in later phases.
- Cover picker proved the media variant: `url({ ..., variant: '600x400!' })` is the real working format.
- Invitation groundwork partly landed in add-members flow already: share + QR source link exists; Phase 7 scope is only public join handling.

### [Phase 3: Adventure View Screen](adventures/phase-3-view.md)

- [x] **Task 1:** Extract Avatars Component — `@/app/ui/Avatars`, refactor 3 usages
- [x] **Task 2:** Compound Expense Card + Adventure Expenses
- [x] **Task 3:** Totals Component — 2-column stat cards
- [x] **Task 4:** Adventure View Route — `/adventures/[id]/`

### [Phase 4: Adventure Expense Editor & View](adventures/phase-4-editor.md)

- [x] **Task 1:** Adventure Expense Form — standalone `@/adventures/ui/expenses/form/` (Description, Total, PayerSelect, Form)
- [x] **Task 2:** Adventure Selector — `@/adventures/ui/Selector`, bridges regular/adventure editors
- [x] **Task 3:** Adventure Expense Editor Route — `/adventures/[id]/expenses/editor/[[eid]]/`
- [x] **Task 4:** Regular Editor Selector Integration — add Selector to `@/expenses/ui/Editor/Edit.svelte`
- [x] **Task 5:** Adventure Expense Details — `@/adventures/ui/expenses/details/` (Description, Totals)
- [x] **Task 6:** Adventure Expense View Route — `/adventures/[id]/expenses/[eid]/`
- [x] **Task 7:** Update Expense Card & UI Exports — card links to view page, barrel exports

### [Phase 5: Archive Screen](adventures/phase-5-archive.md)

- [x] **Task 1:** Add `expose` to Groups Domain — network + service + export
- [x] **Task 2:** Create `@/contacts/ui/Graph` — extract d3 force graph from groups
- [x] **Task 3:** Migrate Groups to New Graph — delete old, update dev page
- [x] **Task 4:** Adventures Expose + Archive Service — network + service + export
- [x] **Task 5:** `ago` Helper + `Archived` Component
- [x] **Task 6:** Archive Action Component — `Archive.svelte` in editor form
- [x] **Task 7:** Archive Route — `/adventures/[id]/archive/` (RadioGroup, Graph, Hold)
- [x] **Task 8:** View Page Integration + Expenses Delete Shortcut

**Phase 5 actual deltas**

- Archive route uses `RadioGroup` (merge/keep) instead of `Switch` — clearer UX with labeled options.
- Info warning panel with `Info` icon at top of archive screen (before graph).
- Graph rendered inside `Panel` with `aspect-3/2` constraint.
- Hold buttons use `actionVariants({ variant: 'destructive' })` (cva-based) instead of `variant` prop.
- `Archive` action component added to editor form — not originally planned, emerged as natural entry point to archive flow.
- `Expenses` component shows delete shortcut when adventure has no expenses.
- View page hides settings button and create action for archived adventures.
- Adventures `expose` + `archive` services landed as Task 4 (originally only groups expose was planned).

### [Phase 6: Integration](adventures/phase-6-integration.md)

- [ ] **Task 1:** Adventures Panel (Card) — cover background + title
- [ ] **Task 2:** Adventures Section (Horizontal Scroll)
- [ ] **Task 3:** Adventures Section on Pages — home + expenses pages
- [ ] **Task 4:** Main Dropdown Adventure Shortcut
- [ ] **Task 5:** Update UI Exports

### [Phase 7: Invitations](adventures/phase-7-invitations.md)

- [ ] **Task 1:** Join Route — public invitation page (share/QR origin already done in Phase 2)

### [Phase 8: Notifications](adventures/phase-8-notifications.md)

- [ ] **Task 1:** Add `adventures` to Transmission Scope Types
- [ ] **Task 2:** Add Adventure Notification Payloads
- [ ] **Task 3:** Adventure Notification Components — Joined
- [ ] **Task 4:** Adventure Notification Components — Expense
- [ ] **Task 5:** Register Adventure Components
- [ ] **Task 6:** i18n — Notification Strings
- [ ] **Task 7:** i18n — Transmission Settings Strings
- [ ] **Task 8:** Add Adventures to Transmission Scopes
- [ ] **Task 9:** Navigation Badge — Adventures Notifications
- [ ] **Task 10:** Dev Page — Adventure Notification Mocks
- [ ] **Task 11:** Verification & Commit

### [Phase 9: Verification](adventures/phase-9-verification.md)

- [ ] **Task 1:** Build & Type Check
- [ ] **Task 2:** Manual Testing

---

## Resolved from Backend Exploration

- **API shape** — fully verified. All endpoints, request/response types confirmed. See Task 2.
- **`expose`** — returns `contacts.net.Contact[]` (identical to groups.expose, delegates to `contacts.expose`). No separate `ExposeContact` type — reuse `Contact` from `@/contacts/svc/net`. Graph resolves accounts at render time.
- **`archive`** — accepts `{ merge?: boolean }`. `merge: true` settles via `contacts.apply()`
- **`archive` without expenses** — backend sets `_deleted` (soft delete), adventure removed from listings. UI shows "Delete" flow (no graph, no merge switch). Service calls `adventures.delete(id)` locally.
- **`add`** — accepts `{ participants?: string[], expenses?: ExpenseInput[] }`, up to 16 expenses per call
- **Pictures API** — `POST /adventures/pictures` (dedicated endpoint, `anyone: true`, accepts `image/*`). Frontend: `pictures.post(file)` with separate `resource<{ id: string }>` in `interface.ts`, `upload(file)` re-exported from `@/adventures`
- **`picture` in create** — required field (not optional as originally in design doc)
- **`url()` helper variant** — verified in shipped cover picker: `600x400!`
