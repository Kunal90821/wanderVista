import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { postServices } from '../../services/post';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials, { rejectWithValue, dispatch }) => {
        try{
            const response = await postServices.loginUser(userCredentials);
            dispatch(loginUserSuccess(response.data));
            dispatch(fetchUser());
            return response.data;
        }catch(error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(userData, { rejectWithValue, dispatch }) => {
        try{
            const response = await postServices.registerUser(userData);
            dispatch(registerUserSuccess(response.data));
            dispatch(fetchUser());
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async(_, { rejectWithValue, dispatch }) => {
        try {
            const response = await postServices.fetchUser();
            dispatch(fetchUserSuccess(response.data));
            return response.data;
        }catch(error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    loading: false,
    user: null,
    error: false,
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        loginUserFailure: (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload;
        },
        registerUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        registerUserFailure: (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload;
        },
        fetchUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        fetchUserFailure: (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending,(state => {
                state.loading = true;
                state.user = null;
                state.error = null;
            }))
            .addCase(loginUser.fulfilled,(state,action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected,(state,action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
            .addCase(registerUser.pending,(state => {
                state.loading = true;
                state.user = null;
                state.error = null;
            }))
            .addCase(registerUser.fulfilled,(state,action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected,(state,action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
            .addCase(fetchUser.pending,(state => {
                state.loading = true;
                state.user = null;
                state.error = null;
            }))
            .addCase(fetchUser.fulfilled,(state,action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUser.rejected,(state,action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
    }
});

export const { loginUserSuccess, loginUserFailure, registerUserSuccess, registerUserFailure, fetchUserSuccess, fetchUserFailure } = authSlice.actions;

export default authSlice.reducer;