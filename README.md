# 🐉 Anime Character Battle Simulator

A React + Redux-based anime-themed battle simulator where users build DBZ teams and simulate turn-based battles based on character stats. Built for learning advanced frontend patterns like normalized state, RTK Query, and battle logic.

---

## 🗂️ Project Structure & Folder Purpose


---

## 🧠 Folder-by-Folder Explanation

### `/components/`
UI-only components. No logic or state here.
- `common/`: Generic UI widgets (`<Button />`, `<StatBar />`, `<Loader />`)
- `character/`: Shows character stats, filters, search results
- `team/`: Displays selected teams, load/save buttons
- `battle/`: Shows battle results, logs, and winner
- `pages/`: Route-level layout (e.g., Character List, Team Builder)

### `/features/`
Handles all state and logic using Redux Toolkit (RTK).
- `characters/`: Normalized state via `createEntityAdapter`, filters
- `team/`: Current team array, saved teams, localStorage sync
- `battle/`: Battle progress, log, and simulation logic (`battleEngine.ts`)

### `/services/`
API configuration using RTK Query.
- `characterApi.ts`: Auto-generates endpoints and hooks for fetching DBZ character data

### `/utils/`
Pure, testable logic — not tied to UI or Redux.
- `battleSimulator.ts`: Handles turn-by-turn battle calculation
- `localStorage.ts`: Save/load helpers for teams and battle history
- `filters.ts`: Saga, role, and power-level filtering logic

### `/app/`
Global app setup and providers.
- `store.ts`: Redux store config with all slices and middleware
- `routes.tsx`: React Router config for navigating pages

### `/assets/`
Stores images, audio, or visual files used by components.

### `/styles/`
Tailwind CSS config and global styles.

---

## 📦 Redux State Schema (Simplified)

```ts
// Normalized Redux Entity Shape (RTK createEntityAdapter)
{
  characters: {
    entities: {
      1: { id: 1, name: "Goku", saga: "Frieza", role: "hero", stats: { atk: 90, def: 70, spd: 85 } },
      ...
    },
    ids: [1, 2, 3, ...],
    filter: { saga: "Frieza", role: "hero", powerLevel: ">8000" }
  },
  team: {
    current: [1, 4, 7],
    saved: {
      "team1": [1, 4, 7, 8, 10],
      "team2": [2, 3, 5]
    }
  },
  battle: {
    currentBattle: {
      teamA: [1, 4, 7],
      teamB: [2, 3, 6],
      log: [
        { turn: 1, attacker: 1, defender: 2, damage: 12, result: "hit" },
        ...
      ],
      winner: "teamA"
    },
    history: [/* past battles */]
  }
}

