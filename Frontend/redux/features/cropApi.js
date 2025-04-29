import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cropApi = createApi({
  reducerPath: 'cropApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/crop/' }), // Your backend URL
  endpoints: (builder) => ({
    addCrop: builder.mutation({
      query: (cropData) => ({
        url: 'create', // Your crop endpoint
        method: 'POST',
        body: cropData,
      }),
    }),
  }),
});

export const { useAddCropMutation } = cropApi;
