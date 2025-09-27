import { motion } from 'framer-motion';

const SavedTeamPanel = ({ warrior }) => {

    const onLoad = (team) => {
        console.log('Load team:', team);
    };

    const onDelete = (id) => {
        console.log('Delete team with id:', id);
    };

    const savedTeams = [
        {
            id: '1',
            name: 'Saiyan Team',
            timestamp: Date.now(),
            members: [
                { name: 'Goku', image: '/goku.png' },
                { name: 'Vegeta', image: '/vegeta.png' },
                { name: 'Gohan', image: '/gohan.png' },
            ],
        },
        {
            id: '2',
            name: 'Villain Team',
            timestamp: Date.now(),
            members: [
                { name: 'Frieza', image: '/frieza.png' },
                { name: 'Cell', image: '/cell.png' },
                { name: 'Majin Buu', image: '/buu.png' },
            ],
        },
    ];

    return (
        <div className="w-full bg-[#111111] p-4 rounded-2xl shadow-inner border border-[#222]">
            <h2 className="text-white text-lg font-bold mb-4 tracking-wide">💾 Saved Teams</h2>

            {savedTeams.length === 0 ? (
                <p className="text-gray-500 text-sm text-center">No saved teams yet.</p>
            ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {savedTeams.map((team) => (
                        <motion.div
                            key={team.id}
                            className="group bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] rounded-xl p-3 border border-transparent hover:border-[#444] transition-all relative"
                            whileHover={{ scale: 1.01 }}
                        >
                            {/* Team Name + Timestamp */}
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="text-white text-sm font-semibold truncate">
                                    {team.name || 'Unnamed Team'}
                                </h3>
                                <span className="text-gray-500 text-[10px]">
                                    {new Date(team.timestamp).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Character Preview */}
                            <div className="flex gap-2 mt-1 mb-2">
                                {team.members.slice(0, 5).map((char, idx) => (
                                    <img
                                        key={idx}
                                        src={char.image || '/placeholder.png'}
                                        alt={char.name}
                                        className="w-10 h-10 object-cover rounded-full border border-gray-700"
                                    />
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2 text-xs">
                                <button
                                    onClick={() => onLoad(team)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-all"
                                >
                                    Load
                                </button>
                                <button
                                    onClick={() => onDelete(team.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedTeamPanel;
