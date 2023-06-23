import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  error: null,
  status: 'idle',
};



export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userdata) => {
    const response = await createUser(userdata);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'auth/checkUser',
  async (userdata) => {
    const response = await checkUser(userdata);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      });
  },
});

export const {  } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
