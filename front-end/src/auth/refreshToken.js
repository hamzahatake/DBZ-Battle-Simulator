import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('access');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // try refresh
        const refreshToken = localStorage.getItem('refresh');
        const refreshResult = await baseQuery({
            url: '/token/refresh/',
            method: 'POST',
            body: { refresh: refreshToken }
        }, api, extraOptions);

        if (refreshResult.data) {
            localStorage.setItem('access', refreshResult.data.access);
            result = await baseQuery(args, api, extraOptions); // retry original query
        }
    }
    return result;
};

export default baseQueryWithReauth;
