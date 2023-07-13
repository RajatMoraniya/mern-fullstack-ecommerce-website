import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOut } from "./authAPI";

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  error: null,
  status: "idle",
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userdata) => {
    const response = await createUser(userdata);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (userdata,{rejectWithValue}) => {
    try {
      const response = await checkUser(userdata);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      });
  },
});


export const selectLoggedInUserToken = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
