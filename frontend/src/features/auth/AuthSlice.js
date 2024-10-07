import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postServices } from '../../services/post.js'


// save user in localStorage

const saveUserToLocalStorage = (user) => {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user))
    } else {
        localStorage.removeItem('user')
    }
}


// load user from localStorage

const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
}


const initialState = {
    loading: false,
    user: loadUserFromLocalStorage(),   // load user from localStorage
    error: null,
};

export const loginUser = createAsyncThunk('user/loginUser',
    async (userCredentials, { rejectWithValue, dispatch }) => {
    try{
        const response = await postServices.loginUser(userCredentials)
        dispatch(loginUserSuccess(response.data))
        dispatch(fetchUser())
        return response.data
    } catch(error) {
        return rejectWithValue(error.response.data)
    }
})


export const registerUser = createAsyncThunk('user/registerUser',
    async(userCredentials, { rejectWithValue, dispatch }) => {
        try{
            const response = await postServices.registerUser(userCredentials)
            dispatch(registerUserSuccess(response.data))
            dispatch(fetchUser())
            return response.data
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const fetchUser = createAsyncThunk('user/fetchUser',
    async(_,{ rejectWithValue, dispatch }) => {
        try {
            const response = await postServices.fetchUser()
            dispatch(fetchUserSuccess(response.data)) // Update the Redux store with the user data
            return response.data
        } catch(error) {
            if(error.response && error.response.data === 401) {
                // Session expired
                dispatch(clearUserSession())
                return rejectWithValue('Session expired')
            }
            return rejectWithValue(error.response.data)
        }
    }
)


export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUserSuccess: (state,action) => {
            state.loading = false
            state.user = action.payload
            state.error = null
            saveUserToLocalStorage(action.payload)
        },
        loginUserFailure: (state,action) => {
            state.loading = false
            state.user = null
            state.error =  action.payload
            saveUserToLocalStorage(null);
        },
        registerUserSuccess: (state,action) => {
            state.loading = false
            state.user = action.payload
            state.error = null
            saveUserToLocalStorage(action.payload);
        },
        registerUserFailure: (state,action) => {
            state.loading = false
            state.user = null
            state.error = action.payload
            saveUserToLocalStorage(null);
        },
        fetchUserSuccess: (state,action) => {
            state.loading = false
            state.user = action.payload
            state.error = null
            saveUserToLocalStorage(action.payload);
        },
        fetchUserFailure: (state,action) => {
            state.loading = false
            state.user = null
            state.error = action.payload
            saveUserToLocalStorage(null);
        },
        clearUserSession : (state,action) => {
            state.user = null
            state.error = null
            saveUserToLocalStorage(null)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state,action) => {
                state.loading = true
                state.user = null
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state,action) => {
                state.loading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(loginUser.rejected, (state,action) => {
                state.loading = false
                state.user = null
                state.error = action.error.message
            })
            .addCase(registerUser.pending, (state,action) => {
                state.loading = true
                state.user = null
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state,action) => {
                state.loading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(registerUser.rejected, (state,action) => {
                state.loading = false
                state.user = null
                state.error = action.error.message
            })
            .addCase(fetchUser.pending, (state,action) => {
                state.loading = true
                state.user = null
                state.error = null
            })
            .addCase(fetchUser.fulfilled, (state,action) => {
                state.loading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(fetchUser.rejected, (state,action) => {
                state.loading = false
                state.user = null
                state.error = action.error.message
            })
    }
})

export const { loginUserSuccess, loginUserFailure, registerUserSuccess, registerUserFailure, fetchUserSuccess, fetchUserFailure, clearUserSession } = authSlice.actions

export default authSlice.reducer