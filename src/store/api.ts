import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../lib/supabase'
import { Recipe } from '../types/recipe'

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers) => {
      const token = supabase.auth.getSession().then(({ data }) => data.session?.access_token)
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ['Recipe', 'Favorites'],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => 'recipes',
      providesTags: ['Recipe'],
    }),
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => `recipes/${id}`,
      providesTags: (result, error, id) => [{ type: 'Recipe', id }],
    }),
    createRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (newRecipe) => ({
        url: 'recipes',
        method: 'POST',
        body: newRecipe,
      }),
      invalidatesTags: ['Recipe'],
    }),
    updateRecipe: builder.mutation<void, Pick<Recipe, 'id'> & Partial<Recipe>>({
      query: ({ id, ...patch }) => ({
        url: `recipes/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Recipe'],
    }),
    deleteRecipe: builder.mutation<void, string>({
      query: (id) => ({
        url: `recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipe'],
    }),
  }),
})

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi
