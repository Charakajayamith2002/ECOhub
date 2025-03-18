import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice'; // Import the auth reducer
import cartReducer from './cart/cartSlice'; // Import the cart reducer correctly//+

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, 
  },
  
});

export default store;
