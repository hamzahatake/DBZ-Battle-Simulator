import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/characters/',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('access')
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401 || result?.error?.status === 403) {
        console.warn("Access token expired, trying refresh token...");

        const refreshToken = localStorage.getItem('refresh');
        if (!refreshToken) {
            return result;
        }

        // Try to get a new access token
        const refreshResult = await baseQuery({
            url: 'token/refresh/',
            method: 'POST',
            body: { refresh: refreshToken },
        }, api, extraOptions);

        if (refreshResult?.data?.access) {
            localStorage.setItem('access', refreshResult.data.access);

            result = await baseQuery(args, api, extraOptions);
        } else {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        }
    }

    return result;
};

export const charactersApi = createApi({
    reducerPath: 'charactersApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getCharacters: builder.query({
            query: (filter = {}) => {
                const param = new URLSearchParams();

                if (filter.saga) param.append('saga', filter.saga);
                if (filter.role) param.append('role', filter.role);
                if (filter.powerlevel) param.append('powerlevel', filter.powerlevel);

                const queryString = param.toString();
                return (queryString.length >= 1) ? `characters/?${queryString}` : `characters/`
            },
            transformResponse: (response) => {
                if (!Array.isArray(response)) {
                    console.warn('Unexpected response:', response)
                    return []
                }

                const mapped = response.map((chr) => ({
                    id: chr?.id ?? 0,
                    name: chr?.name ?? "",
                    form: chr?.form ?? "",
                    description: chr?.description ?? "",
                    saga: chr?.saga ?? "",
                    role: chr?.role ?? "",
                    type: chr?.type ?? "",
                    level: chr?.level ?? "",
                    attack_level: chr?.attack_level ?? 0,
                    defense_level: chr?.defense_level ?? 0,
                    speed_level: chr?.speed_level ?? 0,
                    energy_level: chr?.energy_level ?? 0,
                    special_move: chr?.special_move ?? "",
                    ultimate_move: chr?.ultimate_move ?? "",
                    strengths: chr?.strengths ?? "",
                    weaknesses: chr?.weaknesses ?? "",
                    image_full_body: chr?.image_full_body ?? "",
                    image_profile: chr?.image_profile ?? ""
                }))

                return mapped.sort((a, b) => b.level - a.level)
            }
        })
    })
})

export const { useGetCharactersQuery } = charactersApi; 