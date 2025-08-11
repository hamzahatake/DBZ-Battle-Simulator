import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userProfileApi = createApi({
    reducerPath: 'userProfileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => '/users/profile/',
        }),
        updateUserProfile: builder.mutation({
            query: (updatedData) => ({
                url: '/users/profile/',
                method: 'PUT',
                body: updatedData,
            }),
        }),
    }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userProfileApi;
