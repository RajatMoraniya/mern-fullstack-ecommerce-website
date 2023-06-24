import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCart,
  fetchCartItems,
  updateCart,
  resetCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (productData) => {
    const response = await addToCart(productData);
    return response.data;
  }
);
export const fetchCartItemsAsync = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await fetchCartItems(userId);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (updateData) => {
    const response = await updateCart(updateData);
    return response.data;
  }
);

export const deleteCartAsync = createAsyncThunk(
  "cart/deleteCart",
  async (itemId) => {
    const response = await deleteCart(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const idx = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[idx] = action.payload;
      })
      .addCase(deleteCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const idx = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(idx, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const {} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
