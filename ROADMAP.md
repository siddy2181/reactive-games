# Reactive Games Roadmap

Goal: grow the site gradually into a multi-game platform with multiplayer, leaderboards and community suggestions.

**Constraint:** the site is deployed on GitHub Pages (static hosting). Games and local features work as-is. Multiplayer, leaderboards and shared suggestions need a hosted backend-as-a-service (Supabase preferred, Firebase as the alternative), added in Phase 3.

## Phase 1: Make adding a game cheap
- [ ] Move each game to `src/games/<id>/` exporting `{ id, name, description, Component }`
- [ ] Add `src/games/index.js` registry; `App.jsx` reads from it
- [ ] Extract game logic (e.g. `calculateWinner`) into pure functions
- [ ] Add Vitest and unit tests for game logic
- [ ] Add `react-router` (hash router) so each game has a shareable URL, e.g. `/#/wordle`
- [ ] Build Wordle on the new structure

## Phase 2: Local state and a standard result
- [ ] Define the "game finished" result: `{ gameId, outcome, score, durationMs, playedAt }`
- [ ] Every game calls `onFinish(result)`
- [ ] Persist results in `localStorage`; show personal stats and streaks
- [ ] Shared UI: Layout, Button, GameShell (status bar, restart)

## Phase 3: Backend, accounts and leaderboards
- [ ] Set up Supabase (or Firebase) project and client
- [ ] Anonymous / Google sign-in
- [ ] `scores` table; `onFinish` also posts there
- [ ] Per-game leaderboard page (daily, weekly, all-time)
- [ ] Server-side validation for games where cheating matters

## Phase 4: Multiplayer
- [ ] Refactor games to a reducer shape `(state, action) => state`
- [ ] `rooms` table with game state and current turn
- [ ] Realtime sync for turn-based games, starting with tic-tac-toe
- [ ] Room codes / invite links and a lobby
- [ ] Later, if ever: real-time games via a dedicated WebSocket server

## Phase 5: Suggestions and community
- [ ] Suggestions table, form and upvotes (sign-in required, rate limited)
- [ ] "Recommended for you" row on the home page based on play history

## Decisions to make early
- **Backend:** Supabase (recommended) vs Firebase
- **TypeScript:** adopt now (cheaper) or stay on JS
- **Styling:** plain CSS is fine for now; consider CSS modules or Tailwind at 5+ games
