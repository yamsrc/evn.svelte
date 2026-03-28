# Receipts

- [x] dev navigation
- [x] Upload
- [x] Pending image
- [x] Pending processing
- [x] Ready (Continue)
- [x] CRDT
- [x] Tail merging (diffs)
- [x] Participants list
- [x] Add participants
- [x] Leave receipt
- [x] Select actor
- [x] Shared items (and item groups)
- [ ] Mark as Done
- [ ] Split taxes
- [ ] Pending state screen
- [ ] Error state screen (+non-receipts)

## Routes

Pending: `/events/receipts/pending/` `{ promise }`
Receipt: `/events/receipts/{id}/`

## Data model

Transition groups:

```yaml
id: string # random uuid
items: Item[] # line items with single unit or one multi-unit item
```
