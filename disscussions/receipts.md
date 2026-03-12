# Receipts

- [x] dev navigation
- [x] Upload
- [x] Pending image
- [x] Pending processing
- [x] Ready (Continue)
- [ ] Receipt screen
  TODO
- [ ] Pending state screen
- [ ] Error state screen

## Routes

Pending: `/events/receipts/pending/` `{ promise }`
Receipt: `/events/receipts/{id}/`

## Data model

Line item:

```yaml
ids: string[]
name: string
price: number
claimedBy: string[]
```
