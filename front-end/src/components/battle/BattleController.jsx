const BattleController = ({ onNextTurn, onAutoBattle, onReset }) => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
            <button
                onClick={onNextTurn}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded-xl transition duration-200 shadow-lg"
            >
                Next Turn
            </button>

            <button
                onClick={onAutoBattle}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-xl transition duration-200 shadow"
            >
                Auto Battle
            </button>

            <button
                onClick={onReset}
                className="bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-6 rounded-xl transition duration-200 shadow-md"
            >
                Reset
            </button>
        </div>
    );
};

export default BattleController;
