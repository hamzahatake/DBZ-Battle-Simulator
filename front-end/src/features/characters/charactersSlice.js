import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const charactersApi = createApi({
    reducerPath: 'charactersApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/` }),
    endpoints: (builder) => {
        getCharacters: builder.query({
            query: () => `/characters/?saga=${saga}`
        })
    }
})