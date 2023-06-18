import { configureStore } from '@reduxjs/toolkit';
import productListrReducer from '../features/productList/productListSlice';

export const store = configureStore({
  reducer: {
    ProductList: productListrReducer,
  },
});
