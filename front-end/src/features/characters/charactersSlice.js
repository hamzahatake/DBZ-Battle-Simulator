import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const charactersApi = createApi({
    reducerPath: 'charactersApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://127.0.0.1:8000/api/` }),
    endpoints: (builder) => ({
        getCharacters: builder.query({
            query: (filter = {}) => {
                const param = new URLSearchParams();

                if (filter.saga) param.append('saga', filter.saga);
                if (filter.role) param.append('role', filter.role);
                if (filter.powerlevel) param.append('powerlevel', filter.powerlevel);

                const queryString = param.toString();
                return (queryString.length >= 1) ? `/characters/?${queryString}` : `/characters/`
            },
            transformResponse: (response) =>
                response.map((chr) => ({
                    id: chr?.id ?? 0,
                    name: chr?.name ?? "",
                    saga: chr?.saga ?? "",
                    role: chr?.role ?? "",
                    powerlevel: chr?.powerlevel ?? 0,
                    attack: chr?.attack ?? 0,
                    defense: chr?.defense ?? 0,
                    speed: chr?.speed ?? 0,
                    image: chr?.image_url ?? ""
                }))
        })
    })
})

export const { useGetCharactersQuery } = charactersApi; 