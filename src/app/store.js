import { configureStore } from '@reduxjs/toolkit';
import productListrReducer from '../features/productList/productSlice';

export const store = configureStore({
  reducer: {
    ProductList: productListrReducer,
  },
});
