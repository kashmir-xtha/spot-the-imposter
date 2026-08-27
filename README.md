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

## Notes / things you may want to customize

- `assets/icon.png`, `assets/favicon.png`, and `assets/splash-icon.png` are
  Expo's default placeholder icons — swap them for real branding before
  publishing.
- Word pools in `src/data/entities.ts` are a solid starting set per category;
  add more entries any time — the game automatically pulls from whatever
  categories are selected.
- The discussion timer is intentionally optional and doesn't gate anything —
  the host can hit "End Game" at any point regardless of the clock.

## Building an installable APK

There are two ways to get a `.apk` your friends can sideload on Android. Both
are already wired up in this repo.

### Option A — GitHub Actions (fully automated, no local setup)

`.github/workflows/build-apk.yml` builds the app on GitHub's servers and
attaches the APK to a GitHub Release.

1. Push this project to a GitHub repo.
2. Tag a version and push the tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. Wait for the **Actions** tab to finish (a few minutes) — it'll show up
   under **Releases** on your repo with `find-the-imposter.apk` attached.
4. Share the Release link. On an Android phone: download the APK, allow
   "install unknown apps" for the browser/Files app when prompted, then
   install.

You can also trigger it manually from the **Actions** tab ("Run workflow")
without tagging — the APK is attached to that run as a downloadable artifact
instead of a Release.

This produces a **release build, signed with the auto-generated debug
keystore** — perfectly fine for sideloading and sharing directly, but not
accepted by the Google Play Store (that needs a real release keystore, which
is intentionally not set up here to avoid managing signing secrets for a
personal project).

### Option B — EAS Build (Expo's cloud build service)

Useful if you'd rather not touch CI, or later want a Play Store–ready build.

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview   # sideloadable APK, see eas.json
```

EAS gives you a download link when the build finishes (also visible at
expo.dev). To build a Play Store bundle instead, use `--profile production`
(outputs an `.aab`, which EAS can also submit directly with `eas submit`).

### Option C — Build locally

Requires Android Studio / the Android SDK installed:

```bash
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
# APK lands at android/app/build/outputs/apk/release/app-release.apk
```

⚠️ Use `assembleRelease`, not `assembleDebug`. A debug build doesn't embed
the JavaScript bundle — it expects a live Metro dev server on your computer
and will fail with "Unable to load script" if you try to sideload it
standalone. `assembleRelease` bundles the JS via Hermes at build time (still
signed with the auto-generated debug keystore, so no signing setup is
needed) and produces a real standalone APK.

