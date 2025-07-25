export default function SearchFilterPanel({ searchQuery, setSearchQuery }) {

    return (
        <div className="flex justify-center w-full p-4 md:px-8">
            <div className="w-full max-w-7xl bg-gray-800 bg-opacity-70 p-6 rounded-2xl shadow-lg flex flex-wrap gap-6 justify-between items-end">
                {/* Saga Filter */}
                <div className="flex flex-col min-w-[150px]">
                    <label htmlFor="saga" className="text-sm font-semibold text-yellow-400 mb-1">Saga</label>
                    <select
                        id="saga"
                        className="bg-gray-900 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="">All</option>
                        <option value="Saiyan">Saiyan</option>
                        <option value="Frieza">Frieza</option>
                        <option value="Cell">Cell</option>
                        <option value="Buu">Buu</option>
                    </select>
                </div>

                {/* Role Filter */}
                <div className="flex flex-col min-w-[150px]">
                    <label htmlFor="role" className="text-sm font-semibold text-yellow-400 mb-1">Role</label>
                    <select
                        id="role"
                        className="bg-gray-900 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="">All</option>
                        <option value="Hero">Hero</option>
                        <option value="Villain">Villain</option>
                        <option value="Anti-Hero">Anti-Hero</option>
                        <option value="Support">Support</option>
                    </select>
                </div>

                {/* Power Level Filter */}
                <div className="flex flex-col min-w-[150px]">
                    <label htmlFor="power" className="text-sm font-semibold text-yellow-400 mb-1">Power Level</label>
                    <select
                        id="power"
                        className="bg-gray-900 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="">Any</option>
                        <option value="under-1000">1 - 25</option>
                        <option value="1000-10000">26 - 50</option>
                        <option value="10000-plus">50+</option>
                    </select>
                </div>

                {/* Search Bar */}
                <div className="flex flex-col flex-1 min-w-[200px]">
                    <form onSubmit={() => warriors()}>
                        <label htmlFor="search" className="text-sm font-semibold text-yellow-400 mb-1">Search</label>
                        <input
                            type="text"
                            id="search"
                            placeholder="Search characters..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-900 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
