# Receipts invitations — design

## Scope

- Dev section "Invitations" with two entries: Groups, Receipt.
- Groups: `/dev/components/joins/groups/` — show one random group invitation from current user's groups; if none, show "Create group" CTA.
- Receipt: new invitation component + net/svc layers; dev page at `/dev/components/joins/receipts/` (no id in URL; receipt id supplied by other means if needed for demo).
- No public invitation page for receipts in this phase. No E2E tests. No i18n yet — English copy inline and `<!-- TODO: i18n -->` next to each text element.

---

## 1. Dev navigation and joins index

- In `/dev/` add link "Invitations" → `/dev/components/joins/`.
- In `/dev/components/+page.svelte` add link "Invitations" → `joins/`.
- New route `/dev/components/joins/+page.svelte`: list links — "Groups" → `joins/groups/`, "Receipt" → `joins/receipts/`.

---

## 2. Groups: `/dev/components/joins/groups/`

- **Load:** call `get()` from `@/groups` (current user's groups). If result is empty or error, pass through; else pick one random group.
- **Page:**
  - If no groups: single CTA "Create group" (link to existing create-group flow).
  - If one random group: show group invitation using existing invitation component (e.g. same pattern as `/join/group/[id]` — reuse Accept/Panel from groups). No id in URL; group comes from load.
- Copy: English only; next to each text node add `<!-- TODO: i18n -->`.

---

## 3. Receipt invitation — network layer

- **File:** `@/receipts/svc/net/Invitation.ts` (not ReceiptInvitation; namespace is already receipts).
- **Model:** `Invitation` with `id: string`, `identities: string[]`.
- **API:**
  - `GET /receipts/invitations/:id/` — no auth; returns invitation.
  - `DELETE /receipts/invitations/:id/` — with credentials; accept invitation.
- Export from `net/interface.ts`: resource or helpers so service layer can call `.get(id)` and `.accept(id)` (accept = DELETE with credentials).

---

## 4. Receipt invitation — service layer

- In `@/receipts/svc/`: e.g. `invitations.ts` with:
  - `get(id: string): Promise<Invitation | Error>`
  - `accept(id: string): Promise<void | Error>`
- Export from `@/receipts/svc/index.ts` (e.g. `invitations` sub-object or named fns).

---

## 5. Receipt invitation — UI component

- **Location:** `@/receipts/ui/`, e.g. `Invitation.svelte` (or under a subfolder if needed).
- **Props:** at least `receiptId: string`. Optionally preloaded `invitation` to avoid duplicate fetch.
- **Behaviour:**
  - Fetch invitation via `invitations.get(receiptId)` if not provided.
  - Show short summary (id, count of identities) and "Join" (or "Accept") button.
  - On "Join", call `invitations.accept(receiptId)`; on success, `goto('/dev/components/receipts/' + receiptId)`.
  - Local state for loading and errors.
- **Copy:** English only; `<!-- TODO: i18n -->` next to each element that displays text.

---

## 6. Receipt invitation — dev page

- **Route:** `/dev/components/joins/receipts/` (no `[id]` segment).
- **Content:** place Receipt invitation component. Receipt id for demo can be: input field + "Show" button, or hardcoded test id, or link from elsewhere — minimal way to exercise the component.
- Copy and `<!-- TODO: i18n -->` as above.

---

## 7. Out of scope

- Public route `/join/receipt/[id]/`.
- E2E tests.
- i18n / svintl — deferred; use English + TODO comments only.
