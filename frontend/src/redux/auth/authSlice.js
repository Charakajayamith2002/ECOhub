import { createSlice } from '@reduxjs/toolkit';

// Check localStorage for existing user data and initialize the state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,  // Load user data from localStorage if available
  isAuthenticated: !!localStorage.getItem('user'),  // Set isAuthenticated to true if user data exists
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login action to store user data
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));  // Save user data to localStorage
    },
    // Logout action to remove user data
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');  // Remove user data from localStorage
    },
  },
});

// Export actions
export const { loginSuccess, logoutSuccess } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
