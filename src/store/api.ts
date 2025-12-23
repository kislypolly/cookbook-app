import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../lib/supabase'
import { Recipe } from '../types/recipe'

// Custom baseQuery для Supabase REST API
const supabaseBaseQuery = () => async ({ url, method = 'GET', body }: any) => {
  try {
    // Получаем сессию для токена
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token

    // Supabase REST API запрос
    const response = await fetch(
      `https://pyaswecsvjgfzzfouvng.supabase.co/rest/v1/${url}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || supabase.auth.apiKey,
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    )

    const result = await response.json()

    if (!response.ok) {
      return {
        error: {
          status: response.status,
          message: result[0]?.message || 'Unknown error',
        }
      }
    }

    return { data: result }
  } catch (error: any) {
    return {
      error: {
        status: 500,
        message: error.message || 'Network error'
      }
    }
  }
}

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: supabaseBaseQuery(),
  tagTypes: ['Recipe', 'Favorites'],
  endpoints: (builder) => ({
    // Получить все рецепты
    getRecipes: builder.query<Recipe[], { category?: string; limit?: number }>({
      query: ({ category, limit = 10 }) => {
        let query = `recipes?select=*&order=created_at.desc&limit=${limit}`
        if (category) query += `&category=eq.${category}`
        return query
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Recipe' as const, id })),
              { type: 'Recipe', id: 'LIST' },
            ]
          : [{ type: 'Recipe', id: 'LIST' }],
    }),

    // Получить рецепт по ID
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => `recipes?id=eq.${id}`,
      transformResponse: (rawResult: Recipe[]) => rawResult[0],
      providesTags: (result, error, id) => [{ type: 'Recipe', id }],
    }),

    // Создать рецепт
    createRecipe: builder.mutation<Recipe, Omit<Recipe, 'id' | 'created_at'>>({
      query: (newRecipe) => ({
        url: 'recipes',
        method: 'POST',
        body: newRecipe,
      }),
      invalidatesTags: [{ type: 'Recipe', id: 'LIST' }],
    }),

    // Обновить рецепт
    updateRecipe: builder.mutation<void, Partial<Recipe> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `recipes?id=eq.${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Recipe', id }],
    }),

    // Удалить рецепт
    deleteRecipe: builder.mutation<void, string>({
      query: (id) => ({
        url: `recipes?id=eq.${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Recipe', id }],
    }),

    // Получить избранное пользователя
    getFavorites: builder.query<string[], string>({
      query: (userId) => `favorites?user_id=eq.${userId}&select=recipe_id`,
      transformResponse: (rawResult: { recipe_id: string }[]) => 
        rawResult.map(item => item.recipe_id),
    }),

    // Добавить в избранное
    addFavorite: builder.mutation<void, { userId: string; recipeId: string }>({
      query: ({ userId, recipeId }) => ({
        url: 'favorites',
        method: 'POST',
        body: { user_id: userId, recipe_id: recipeId },
      }),
      invalidatesTags: ['Favorites'],
    }),

    // Удалить из избранного
    removeFavorite: builder.mutation<void, { userId: string; recipeId: string }>({
      query: ({ userId, recipeId }) => ({
        url: `favorites?user_id=eq.${userId}&recipe_id=eq.${recipeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
})

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = recipeApi

export default recipeApi
