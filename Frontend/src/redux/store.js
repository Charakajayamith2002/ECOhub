import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice'; // Import the auth reducer
import cartReducer from './Cart/cartSlice'; // Import the cart reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, 
  },
  
});

export default store;
