# Find the Imposter 🕵️

A polished, fully offline **React Native + Expo + TypeScript** party game. Pass the
phone around — most players get a secret word, the imposter(s) only get a category
hint, and everyone else has to figure out who's faking it.

## Running the app

```bash
npm install
npx expo start
```

Then press `a` for Android, `i` for iOS (macOS only), or scan the QR code with the
**Expo Go** app on your phone.

Requires Node.js 18+. No backend, accounts, or internet connection are needed —
the whole game runs on-device.

## What's implemented

- **Setup dashboard** — configure player count (3–20), categories, and imposter
  count (1 to however many players you have; auto-clamped if you lower the player
  count below it).
- **18 categories** across Sports, Entertainment, People & Society, Nature &
  Animals, and Lifestyle, each with its own word pool (`src/data/entities.ts`) —
  easy to extend.
- **Pass-the-phone reveal flow** — each player privately taps to reveal their role.
  Normal players see the secret word; imposters see a red "YOU ARE THE IMPOSTER"
  card with just the category as a hint. Nothing is shown until explicitly tapped,
  and the previous player's info is always cleared before the next player's turn.
- **Random avatars** — every player gets a unique animal avatar for the game,
  shown throughout the reveal, discussion, and results screens.
- **Discussion screen** with an optional, non-blocking countdown timer (+30s /
  pause) before the host ends the round.
- **Results screen** revealing the imposter(s), the secret word, and a full
  player-by-player breakdown, with a "Play Again" (re-randomizes everything) and
  "Main Menu" option.
- All state lives in a single `GameContext` (`src/context/GameContext.tsx`) via
  `useReducer` — no backend, no persistence between app launches by design (a
  fresh game every time you open the app).

## Project structure

```text
App.tsx                  App entry: providers + navigation
index.ts                 Expo/RN entry point
src/
├── components/          Reusable UI building blocks
├── screens/              One file per screen
├── navigation/           Root stack navigator + route types
├── context/              GameContext (state + game logic)
├── data/                 avatars.ts, categories.ts, entities.ts
├── utils/                random.ts (shuffle/pick helpers)
├── types/                Shared TypeScript types
└── constants/            theme.ts (colors, spacing, typography tokens)
```