import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOut } from "./authAPI";
import { updateUser } from "../user/userAPI";

const initialState = {
  loggedInUser: null,
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

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (updateUserdata) => {
    const response = await updateUser(updateUserdata);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (userdata) => {
    const response = await checkUser(userdata);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
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
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
  },
});

export const {} = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
