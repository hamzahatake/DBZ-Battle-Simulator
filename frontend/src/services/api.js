import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Base API configuration
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api/',
  prepareHeaders: (headers, { getState }) => {
    // Add authentication token if available
    const token = getState().auth?.token
    if (token) {
      headers.set('authorization', `Token ${token}`)
    }
    return headers
  },
})

// Main API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Character', 'Battle', 'ImageAsset', 'User'],
  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: 'users/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'users/register/',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'users/logout/',
        method: 'POST',
      }),
    }),
    getUserProfile: builder.query({
      query: () => 'users/profile/',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: 'users/profile/update/',
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // Character endpoints
    getCharacters: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
          if (value) searchParams.append(key, value)
        })
        return `characters/?${searchParams.toString()}`
      },
      providesTags: ['Character'],
    }),
    
    getCharacter: builder.query({
      query: (id) => `characters/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Character', id }],
    }),
    
    getCharacterStats: builder.query({
      query: () => 'characters/stats/',
      providesTags: ['Character'],
    }),

    // Battle endpoints
    getBattles: builder.query({
      query: () => 'battles/',
      providesTags: ['Battle'],
    }),
    
    createBattle: builder.mutation({
      query: (battleData) => ({
        url: 'battles/',
        method: 'POST',
        body: battleData,
      }),
      invalidatesTags: ['Battle'],
    }),
    
    getBattle: builder.query({
      query: (id) => `battles/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Battle', id }],
    }),
    
    getBattleHistory: builder.query({
      query: (id) => `battles/${id}/history/`,
      providesTags: (result, error, id) => [{ type: 'Battle', id }],
    }),

    // Image Asset endpoints
    getImages: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
          if (value) searchParams.append(key, value)
        })
        return `assets/images/?${searchParams.toString()}`
      },
      providesTags: ['ImageAsset'],
    }),
    
    getImagesByCategory: builder.query({
      query: (category) => `assets/images/by_category/?category=${category}`,
      providesTags: ['ImageAsset'],
    }),
    
    getCharacterImages: builder.query({
      query: (characterName) => `assets/images/character_images/?character=${characterName}`,
      providesTags: ['ImageAsset'],
    }),
    
    getUIElements: builder.query({
      query: () => 'assets/images/ui_elements/',
      providesTags: ['ImageAsset'],
    }),
    
    getImageUrls: builder.query({
      query: () => 'assets/image-urls/',
      providesTags: ['ImageAsset'],
    }),
  }),
})

// Export hooks for usage in components
export const {
  // Authentication hooks
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  // Character hooks
  useGetCharactersQuery,
  useGetCharacterQuery,
  useGetCharacterStatsQuery,
  // Battle hooks
  useGetBattlesQuery,
  useCreateBattleMutation,
  useGetBattleQuery,
  useGetBattleHistoryQuery,
  // Image hooks
  useGetImagesQuery,
  useGetImagesByCategoryQuery,
  useGetCharacterImagesQuery,
  useGetUIElementsQuery,
  useGetImageUrlsQuery,
} = api

// Helper functions for image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null
  if (imagePath.startsWith('http')) return imagePath
  return `http://localhost:8000${imagePath}`
}

export const getCharacterImageUrl = (characterName, type = 'profile') => {
  // This will be used with the API to get the correct image URL
  return `http://localhost:8000/api/assets/images/character_images/?character=${characterName}&type=${type}`
}
