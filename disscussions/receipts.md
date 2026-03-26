# Receipts

- [x] dev navigation
- [x] Upload
- [x] Pending image
- [x] Pending processing
- [x] Ready (Continue)
- [x] CRDT
- [x] Tail merging (diffs)
- [ ] Pending state screen
- [ ] Error state screen
- [x] Participants list
- [x] Add participants
- [ ] Leave receipt
- [ ] Select actor
- [ ] Shared items (and item groups)

## Routes

Pending: `/events/receipts/pending/` `{ promise }`
Receipt: `/events/receipts/{id}/`

## Data model

Transition groups:

```yaml
id: string # random uuid
items: Item[] # line items with single unit or one multi-unit item
```
