import BattleHistoryItem from "./BattleHistoryItem";

const BattleHistoryList = ({ battles, onBattleClick }) => {
  if (battles.length === 0) {
    return (
      <div className="text-center py-10 text-white/70 text-lg italic">
        No battles found. Try changing your filters.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-800">
      {battles.map((battle) => (
        <BattleHistoryItem
          key={battle.id}
          battle={battle}
          onClick={() => onBattleClick(battle)}
        />
      ))}
    </div>
  );
};

export default BattleHistoryList;
