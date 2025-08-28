import { createApi } from '@reduxjs/toolkit/query/react';

const getProfile = () => {
    const raw = localStorage.getItem('user_profile');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
};

const setProfile = (profile) => {
    localStorage.setItem('user_profile', JSON.stringify(profile));
};

export const userProfileApi = createApi({
    reducerPath: 'userProfileApi',
    baseQuery: async () => ({ data: null }),
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            queryFn: async () => {
                const profile = getProfile();
                if (!profile) {
                    const fallback = {
                        username: 'goku',
                        email: 'goku@capsule.corp',
                        displayName: 'Son Goku',
                        avatar: '/images/profile/Goku Ultra Instinct.jpg',
                    };
                    setProfile(fallback);
                    return { data: fallback };
                }
                return { data: profile };
            },
        }),
        updateUserProfile: builder.mutation({
            queryFn: async (updatedData) => {
                const current = getProfile() || {};
                const next = { ...current, ...updatedData };
                setProfile(next);
                return { data: next };
            },
        }),
    }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userProfileApi;
