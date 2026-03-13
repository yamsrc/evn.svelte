# Receipts invitations — implementation plan

Spec: `disscussions/changesets/2026-03-13-receipts-invitations-design.md`

Section = feature. Sub-items = separate commits (message + scope).

---

## Dev Invitations nav and joins index

**Test:** Open `/dev/` → see "Invitations" → click → see links "Groups" and "Receipt".

- **feat(dev): add Invitations link to dev root** — Link "Invitations" → `components/joins/` in `/dev/+page.svelte`. English + `<!-- TODO: i18n -->`.
- **feat(dev): add Invitations link to dev components** — Link "Invitations" → `joins/` in `/dev/components/+page.svelte`. English + `<!-- TODO: i18n -->`.
- **feat(dev): add joins index page** — Route `/dev/components/joins/+page.svelte`: links "Groups" → `joins/groups/`, "Receipt" → `joins/receipts/`. English + `<!-- TODO: i18n -->`.

---

## Joins groups page

**Test:** Open `/dev/components/joins/groups/` → "Create group" (if no groups) or one group invitation dialog (Join/Decline). Accept works, redirects.

- **feat(dev): add joins/groups load** — `+page.ts`: `get()` from `@/groups`, pick one random group or empty.
- **feat(dev): add joins/groups page** — `+page.svelte`: no group → CTA "Create group" → `/contacts/groups/`. Group → dialog with Panel (`@/groups/ui`), group name, Join (`invitations.accept` after `having(account)` + `named()`), Decline → back to joins. English + `<!-- TODO: i18n -->`.

---

## Receipt invitations net and svc

**Test:** No UI; layers used in Receipt Invitation UI.

- **feat(receipts): add invitations net layer** — `@/receipts/svc/net/Invitation.ts` (type `Invitation`: id, identities). In `net/interface.ts`: resource `/receipts/invitations/` — `get(id)` no auth, `del(id)` with credentials. Export type from net.
- **feat(receipts): add invitations svc** — `@/receipts/svc/invitations.ts`: `get(id)`, `accept(id)` wrapping net. Export from `@/receipts/svc/index.ts`.

---

## Receipt Invitation UI component

**Test:** Used on joins/receipts page.

- **feat(receipts): add Invitation component** — `@/receipts/ui/Invitation.ts` (Props: receiptId, optional invitation). `Invitation.svelte`: fetch `invitations.get(receiptId)` if no prop; summary (id, count identities) + "Join"; Join → `invitations.accept` → on success `goto('/dev/components/receipts/' + receiptId)`. Loading/error. English + `<!-- TODO: i18n -->`. Export from `@/receipts/ui/index.ts`.

---

## Joins receipts dev page

**Test:** Open `/dev/components/joins/receipts/` → input Receipt ID, "Show" → Invitation (summary + Join). Join → redirect to `/dev/components/receipts/{id}`.

- **feat(dev): add joins/receipts page** — `/dev/components/joins/receipts/+page.svelte`: input + "Show"; render `<Invitation key={receiptId} receiptId={receiptId} />`. English + `<!-- TODO: i18n -->`.
