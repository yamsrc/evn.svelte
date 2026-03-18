# Receipts

- [x] dev navigation
- [x] Upload
- [x] Pending image
- [x] Pending processing
- [x] Ready (Continue)
- [ ] Receipt screen
  - [x] CRDT
  - [x] Tail merging (diffs)
- [ ] Pending state screen
- [ ] Error state screen

## Routes

Pending: `/events/receipts/pending/` `{ promise }`
Receipt: `/events/receipts/{id}/`

## Data model

Transition groups:

```yaml
id: string # random uuid
items: Item[] # line items with single unit or one multi-unit item
```
