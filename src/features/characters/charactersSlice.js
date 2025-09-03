import { createApi } from '@reduxjs/toolkit/query/react';
import { characters as localCharacters } from '../../data/characters';

export const charactersApi = createApi({
    reducerPath: 'charactersApi',
    baseQuery: async () => ({ data: null }),
    endpoints: (builder) => ({
        getCharacters: builder.query({
            // Keep the same hook signature: useGetCharactersQuery(filter)
            // Implement filtering and mapping locally
            queryFn: async (filter = {}) => {
                try {
                    const filtered = localCharacters.filter((c) => {
                        const bySaga = filter.saga ? (c.saga || '').toLowerCase().includes(String(filter.saga).toLowerCase()) : true;
                        const byRole = filter.role ? (c.role || '').toLowerCase() === String(filter.role).toLowerCase() : true;
                        const byPower = filter.powerlevel ? Number(c.level) >= Number(filter.powerlevel) : true;
                        const byName = filter.name ? (c.name || '').toLowerCase().includes(String(filter.name).toLowerCase()) : true;
                        return bySaga && byRole && byPower && byName;
                    });

                    const mapped = filtered.map((chr) => ({
                        id: chr?.id ?? 0,
                        name: chr?.name ?? "",
                        form: chr?.form ?? "",
                        description: chr?.description ?? "",
                        saga: chr?.saga ?? "",
                        role: chr?.role ?? "",
                        type: chr?.type ?? "",
                        level: chr?.level ?? 0,
                        attack_level: chr?.attack_level ?? 0,
                        defense_level: chr?.defense_level ?? 0,
                        speed_level: chr?.speed_level ?? 0,
                        energy_level: chr?.energy_level ?? 0,
                        special_move: chr?.special_move ?? "",
                        ultimate_move: chr?.ultimate_move ?? "",
                        strengths: chr?.strengths ?? "",
                        weaknesses: chr?.weaknesses ?? "",
                        image_full_body: chr?.image_full_body ?? "",
                        image_profile: chr?.image_profile ?? "",
                    }));

                    const sorted = mapped.sort((a, b) => Number(b.level) - Number(a.level));
                    return { data: sorted };
                } catch (e) {
                    return { error: { status: 500, data: e } };
                }
            },
        }),
    }),
});

export const { useGetCharactersQuery } = charactersApi;