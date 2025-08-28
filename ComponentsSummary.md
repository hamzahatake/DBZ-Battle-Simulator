# DBZ Battle Simulator – Component Summary

## 📁 battle/

| Component              | Purpose                                                             |
|-----------------------|----------------------------------------------------------------------|
| `BattleController`    | Controls turns (manual/auto), end/reset buttons                      |
| `BattleField`         | Displays both teams side by side, highlights current attacker        |
| `BattleHistoryItem`   | Single battle entry showing winner, duration, timestamp              |
| `BattleHistoryList`   | List of all past battles                                             |
| `BattleLog`           | Logs each action during battle (attack, heal, miss)                  |
| `BattleSummary`       | Optional: Summary shown after battle ends                            |
| `BattleTurnLog`       | Turn-by-turn log UI, scrollable (live during battle)                 |
| `HistoryFilterBar`    | Filter/sort past battles by outcome, saga, etc.                      |

## 📁 character/

| Component                  | Purpose                                                                 |
|---------------------------|-------------------------------------------------------------------------|
| `CharacterDetail`         | Full detail view (name, saga, role, full stats, backstory if any)       |
| `FilterPanel`             | Handles saga/role/power filters (used inside SearchFilterBar)           |
| `FullBodyCharacterCard`   | Tall card with full image, full stats, used in search results           |
| `ProfileCharacterCard`    | Small card for team previews or profile view on homepage                |

## 📁 team/

| Component              | Purpose                                                          |
|-----------------------|------------------------------------------------------------------|
| `DraggableTeamSlot`   | Enables reordering team slots (via DnD)                          |
| `SavedTeamPanel`      | Lists user’s saved teams for quick load/edit                     |
| `StartBattleButton`   | Triggers battle start logic + navigation to `/battle`            |
| `TeamSlot`            | A single slot in the team grid (with remove option)              |
| `TeamSummary`         | Calculates average team stats and displays them                  |

## 📁 common/

| Component            | Purpose                                                             |
|---------------------|----------------------------------------------------------------------|
| `Button`            | Reusable button with style variants                                  |
| `HeroBanner`        | Themed top banner for homepage                                       |
| `Loader`            | Spinner or loading animation                                         |
| `MarqueeSeparator`  | Moving “Unlocked New Character” strip on homepage                   |
| `Navbar`            | Top nav + logo + optional search (move search logic out if needed)  |
| `StatusBar`         | Optional: Show current team status, turn, or filters                 |

## 📁 pages/

| Page Component         | Purpose                                                              |
|------------------------|----------------------------------------------------------------------|
| `BattlePage`           | Renders BattleField + BattleLog + Controller                         |
| `CharacterListPage`    | Fetches characters from API + renders `SearchFilterBar` + cards      |
| `HistoryPage`          | Loads past battle history from state or API                         |
| `HomePage`             | HeroBanner + profile-style cards + team preview                     |
| `TeamBuilderPage`      | DnD grid + StartBattleButton + TeamSummary                          |