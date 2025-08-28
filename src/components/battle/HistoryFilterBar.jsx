const HistoryFilterBar = ({ filters, setFilters }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 mb-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            {/* Search Field */}
            <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search by name, team, or MVP..."
                className="bg-gray-900 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-1/3"
            />

            {/* Sort Dropdown */}
            <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="bg-gray-900 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
                <option value="recent">Most Recent</option>
                <option value="longest">Longest Battles</option>
                <option value="shortest">Shortest Battles</option>
            </select>
        </div>
    );
};

export default HistoryFilterBar;
