import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../services/api'

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Login failed')
      }
      
      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Sending registration request:', userData)
      
      // Test if backend is reachable first
      try {
        const testResponse = await fetch('http://localhost:8000/api/characters/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('Backend connectivity test:', testResponse.status)
      } catch (testError) {
        console.log('Backend connectivity test failed:', testError)
        throw new Error('Cannot connect to backend server. Please make sure the backend is running.')
      }
      
      const response = await fetch('http://localhost:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      console.log('Registration response status:', response.status)
      console.log('Registration response ok:', response.ok)
      
      if (!response.ok) {
        const error = await response.json()
        console.log('Registration error response:', error)
        console.log('Error keys:', Object.keys(error))
        
        // Format validation errors for better display
        let errorMessage = 'Registration failed'
        if (error.detail) {
          errorMessage = error.detail
        } else if (typeof error === 'object') {
          const errorMessages = []
          Object.keys(error).forEach(key => {
            if (Array.isArray(error[key])) {
              errorMessages.push(`${key}: ${error[key].join(', ')}`)
            } else {
              errorMessages.push(`${key}: ${error[key]}`)
            }
          })
          errorMessage = errorMessages.join('; ')
        }
        
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      console.log('Registration success data:', data)
      
      // Don't auto-login after registration - just return success message
      return { success: true, message: data.message || 'Registration successful' }
    } catch (error) {
      console.log('Registration catch error:', error)
      console.log('Error message:', error.message)
      return rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token
      if (token) {
        await fetch('http://localhost:8000/api/users/logout/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        })
      }
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return null
    } catch (error) {
      // Even if logout fails on server, clear local storage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return null
    }
  }
)

const initialState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action) => {
      const { token, user } = action.payload
      state.token = token
      state.user = user
      state.isAuthenticated = true
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },
    clearCredentials: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.token
        state.user = action.payload.user
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.token
        state.user = action.payload.user
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
  },
})

export const { clearError, setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer
