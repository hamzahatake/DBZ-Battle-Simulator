import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const charactersApi = createApi({
    reducerPath: 'charactersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/',
        prepareHeaders: (headers, { getState }) => {
            // Add authentication token if available
            const token = getState().auth?.token
            if (token) {
                headers.set('authorization', `Token ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Character'],
    endpoints: (builder) => ({
        getCharacters: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams()
                Object.entries(params).forEach(([key, value]) => {
                    if (value) searchParams.append(key, value)
                })
                return `characters/?${searchParams.toString()}`
            },
            providesTags: ['Character'],
            transformResponse: (response) => {
                // Handle paginated response - extract results array
                const characters = response.results || response;
                
                // Transform the response to match the expected format
                return characters.map((character) => ({
                    id: character.id,
                    name: character.name,
                    form: character.form,
                    description: character.description,
                    saga: character.saga,
                    role: character.role,
                    type: character.race, // Map race to type for compatibility
                    level: character.card_level,
                    attack_level: character.attack,
                    defense_level: character.defense,
                    speed_level: character.speed,
                    energy_level: character.energy,
                    special_move: character.special_move,
                    ultimate_move: character.ultimate_move,
                    strengths: character.strengths,
                    weaknesses: character.weaknesses,
                    // Image URLs from backend
                    profile_image_url: character.profile_image_url,
                    full_body_image_url: character.full_body_image_url,
                }))
            },
        }),
        getCharacter: builder.query({
            query: (id) => `characters/${id}/`,
            providesTags: (result, error, id) => [{ type: 'Character', id }],
        }),
        getCharacterStats: builder.query({
            query: () => 'characters/stats/',
            providesTags: ['Character'],
        }),
    }),
});

export const { useGetCharactersQuery, useGetCharacterQuery, useGetCharacterStatsQuery } = charactersApi;