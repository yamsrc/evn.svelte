# Stripe Purchases Plan

## Scope

Client first. Assumes backend endpoints from `discussions/stripe/stripe.api.md` and sibling feature files will exist:

- `POST /stripe/checkout/:identity/ { plan, successUrl, cancelUrl } -> { url }`
- `GET /stripe/prices/:identity/ -> Product[]` or equivalent prices/products response
- `POST /stripe/transactions/:identity/ { sessionId } -> Transaction/Account-confirming response`
- Webhooks grant premium through existing `default.accounts.sync` / `/accounts/echo/` behavior.

## Stage 1: Stripe Service

Add client service surface only; no UI behavior change yet.

- In `src/@/purchases/svc/net/interface.ts`, use HTTP verb names where possible:
  - keep existing `post(identity, body)` for free `/purchases/`.
  - add `stripe.prices.get(identity)` or similar for the planned prices request.
  - add `stripe.checkout.post(identity, body)` for `/stripe/checkout/`.
  - add `stripe.transactions.post(identity, body)` for `/stripe/transactions/`.
- Add `src/@/purchases/svc/stripe.ts`:
  - `prices()` loads products from API.
  - `checkout(productId, urls)` posts selected product id as-is. No client id mapping; API must accept the product ids we show.
  - `confirm(sessionId)` posts transaction, updates `@/iam` account if response carries account state, and tracks `'stripe'` completion.
- Mention backend follow-up: implement Stripe prices/products endpoint later so web prices are not static client config.
- Extend `src/@/ga/svc/events.ts` `PurchaseMethod` with `'stripe'`.

## Stage 2: Purchases Refactoring

Make purchases UI choose Apple or Stripe cleanly.

- Refactor `src/@/purchases/svc/platform.ts` and channel types if needed:
  - Apple remains first for iOS shell.
  - Stripe becomes web channel when feature/config says available.
  - Product ids remain API ids, no translation layer.
- Move orchestration from `src/@/purchases/ui/Offer.svelte` into service helpers:
  - free grant stays via `src/@/purchases/svc/add.ts`.
  - Apple purchase still reports through `@/appstore` and advances to `Complete`.
  - Stripe purchase starts checkout and redirects; it does not call `next()` before leaving page.
- UI details:
  - load products through selected channel.
  - hide restore and Apple-specific disclaimers unless Apple channel is active.
  - add Stripe-specific copy only after final URL/cancel UX is chosen.

## Stage 3: Confirmation And Cancel

Solution unclear; decide before implementation.

- Both Stripe return and cancel should go back to the current page with hash parameters.
- Exact hash contract is unspecified for now:
  - success hash needs to carry `session_id`.
  - cancel hash should let the current page reopen/show paywall state if desired.
- Once decided, implement confirmation handler:
  - detect success hash on current page or route-level shell.
  - call `stripe.confirm(sessionId)`.
  - update account/premium through same `@/iam` + realtime sync flow.
  - show existing `Complete` UI or an error/cancel state.

## Verification

- Unit test Stripe service request shapes and product passthrough.
- Unit test platform channel selection.
- Run `npm test` and `npm run check`.
- Backend API work later should cover discussion feature specs: checkout, prices, transactions, notifications, idempotency.

## Notes

Current key branch to preserve:

```27:60:src/@/purchases/ui/Offer.svelte
let products = $state<Product[]>([])
let loaded = $state<boolean>(false)
let selected = $state<Product | null>(null)

async function onclick() {
  if (products.length !== 0 && selected === null) return

  busy = true

  const method = (() => {
    if (products.length === 0) return freePurchase
    else return paidPurchase
  })()
```

Unresolved questions:

- Exact hash parameter contract for success/cancel.
- Where should hash handling live: paywall component, private layout, or a small route/service controller?
