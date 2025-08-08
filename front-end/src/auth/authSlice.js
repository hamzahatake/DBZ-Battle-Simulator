import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../auth/api'

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const res = await api.post('token/', credentials)

        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)

        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || 'Login failed')
    }
})

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const res = await api.post('register/', userData)
        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || 'Registration failed')
    }
})

export const refreshAccessToken = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    const refresh = localStorage.getItem('refresh')
    try {
        const res = await api.post('token/refresh/', { refresh })
        localStorage.setItem('access', res.data.access)
        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || 'Token refresh failed')
    }
})

const initialState = {
    access: localStorage.getItem('access') || null,
    refresh: localStorage.getItem('refresh') || null,
    isAuthenticated: !!localStorage.getItem('access'),
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.access = null
            state.refresh = null
            state.isAuthenticated = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.access = action.payload.access
                state.refresh = action.payload.refresh
                state.isAuthenticated = true
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(refreshAccessToken.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.loading = false
                state.access = action.payload.access
                state.isAuthenticated = true
            })
            .addCase(refreshAccessToken.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
