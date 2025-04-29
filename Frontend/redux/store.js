import { configureStore } from '@reduxjs/toolkit';
import { cropApi } from './cropApi'; // Path to your cropApi slice

const store = configureStore({
  reducer: {
    // Add the API reducer here
    [cropApi.reducerPath]: cropApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cropApi.middleware), // Add the API middleware for caching and invalidation
});

export default store;
