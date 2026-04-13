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
- [x] Mark as Done
- [x] Autoclose
- [x] Share receipt
- [x] Actions on Summary screen: [edit, close], remove participants button
- [ ] Split taxes
- [x] Pending state screen
- [x] Error state screen (+non-receipts)
- [x] Attachments location. Compatibility? — put to /expenses/attachments/
- [x] Receipt rating
- [ ] ExpenseValue: add `links`
- [ ] API: add `links` `POST`
- [ ] Delete receipt on linked expense? Backlink? 'closed' state?

## Routes

Pending: `/events/receipts/pending/` `{ promise }`
Receipt: `/events/receipts/{id}/`

## Data model

Transition groups:

```yaml
id: string # random uuid
items: Item[] # line items with single unit or one multi-unit item
```
