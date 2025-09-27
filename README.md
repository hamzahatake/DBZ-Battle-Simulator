# 🐉 DBZ Battle Simulator

A full-stack Dragon Ball Z battle simulator with React frontend and Django REST API backend. Users can build teams, simulate turn-based battles, and track battle history.

## 🏗️ Project Structure

```
DBZ-Battle-Simulator/
├── frontend/          # React + Redux frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/           # Django REST API backend
│   ├── dbz_battle_simulator/
│   ├── characters/   # Character management app
│   ├── battles/      # Battle simulation app
│   ├── users/        # User management app
│   └── requirements.txt
├── references/        # Design references and assets
└── README.md
```

## 🚀 Quick Start

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### Backend (Django)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## 🧠 Frontend Architecture

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

## 🔧 Backend Architecture

### Django Apps
- **characters/**: Character management with stats and properties
- **battles/**: Battle simulation with turn-by-turn logging
- **users/**: User authentication and profiles

### API Endpoints
- `GET /api/characters/` - List all characters
- `POST /api/battles/` - Create and simulate battles
- `GET /api/battles/{id}/` - Get battle details and history

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

