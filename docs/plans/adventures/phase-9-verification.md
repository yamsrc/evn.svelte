# Phase 9: Verification

[← Back to Plan](../2026-03-10-adventures-implementation.md)

---

### Task 1: Build & Type Check

```bash
npm run check && npm run lint
```

---

### Task 2: Manual Testing

- Create adventure → verify store updates
- View adventure → verify members, expenses
- Edit adventure → title, cover
- Add expense to adventure → via editor selector and main dropdown
- Archive adventure → verify archived state
- Graph on archive screen → verify d3 rendering
- Groups page → verify Graph refactoring didn't break
- Join invitation → open `/join/adventures/{id}/`, verify accept flow
