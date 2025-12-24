import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../lib/supabase'
import { Recipe } from '../types/recipe'

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Recipe', 'Favorite'],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      queryFn: async () => {
        try {
          const { data, error } = await supabase
            .from('recipes')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(9)

          if (error) return { error }
          return { data: data || [] }
        } catch (error) {
          return { error: { message: 'Ошибка API' } }
        }
      },
      providesTags: ['Recipe'],
    }),

    getRecipeById: builder.query<Recipe, string>({
      queryFn: async (id) => {
        if (!id) {
          return { error: { message: 'ID рецепта обязателен' } }
        }

        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('id', id)
          .single()

        if (error) return { error }
        return { data }
      },
      providesTags: (result, error, id) => [{ type: 'Recipe', id }],
    }),

    createRecipe: builder.mutation<Recipe, Omit<Recipe, 'id' | 'created_at'>>({
      queryFn: async (recipe) => {
        try {
          const {
            data: { user },
            error: authError,
          } = await supabase.auth.getUser()

          if (authError || !user) {
            return { error: { message: 'Требуется авторизация' } }
          }

          const { steps, ...cleanRecipe } = recipe

          const validCategories = [
            'breakfast',
            'lunch',
            'dinner',
            'dessert',
            'snack',
          ]
          const category = validCategories.includes(
            cleanRecipe.category?.toLowerCase(),
          )
            ? cleanRecipe.category.toLowerCase()
            : 'lunch'

          const recipeWithUser = {
            ...cleanRecipe,
            user_id: user.id,
            category,
            instructions: steps || cleanRecipe.instructions || [],
            ingredients: cleanRecipe.ingredients || [],
          }

          const { data, error } = await supabase
            .from('recipes')
            .insert(recipeWithUser)

          if (error) {
            return { error: { message: error.message } }
          }

          return { data: data?.[0] }
        } catch (error: any) {
          return { error: { message: 'Ошибка создания рецепта' } }
        }
      },
      invalidatesTags: ['Recipe'],
    }),

    updateRecipe: builder.mutation<
      Recipe,
      { id: string } & Omit<Recipe, 'id' | 'created_at' | 'author'>
    >({
      queryFn: async (recipe) => {
        try {
          const {
            data: { user },
            error: authError,
          } = await supabase.auth.getUser()

          if (authError || !user) {
            return { error: { message: 'Требуется авторизация' } }
          }

          const {
            id,
            title,
            description,
            ingredients,
            instructions,
            prep_time,
            cook_time,
            servings,
            category,
            difficulty,
          } = recipe

          const updatePayload = {
            title,
            description,
            ingredients,
            instructions,
            prep_time,
            cook_time,
            servings,
            category,
            difficulty,
            user_id: user.id,
          }

          const { data, error } = await supabase
            .from('recipes')
            .update(updatePayload)
            .eq('id', id)
            .select()
            .single()

          if (error) {
            console.error('updateRecipe error', error)
            return { error }
          }

          return { data }
        } catch (e: any) {
          return { error: { message: 'Ошибка обновления рецепта' } }
        }
      },
      invalidatesTags: ['Recipe'],
    }),

    deleteRecipe: builder.mutation<void, string>({
      queryFn: async (id) => {
        const { error } = await supabase
          .from('recipes')
          .delete()
          .eq('id', id)

        if (error) return { error }
        return { data: undefined }
      },
      invalidatesTags: ['Recipe'],
    }),

    getFavorites: builder.query<Recipe[], void>({
      queryFn: async () => {
        try {
          const {
            data: { user },
            error: authError,
          } = await supabase.auth.getUser()

          if (authError || !user) {
            return { error: { message: 'Требуется авторизация' } }
          }

          const { data, error } = await supabase
            .from('favorites')
            .select('recipes(*)')
            .eq('user_id', user.id)

          if (error) return { error }

          const recipes =
            data?.map((row: any) => row.recipes as Recipe).filter(Boolean) || []

          return { data: recipes }
        } catch {
          return { error: { message: 'Ошибка загрузки избранного' } }
        }
      },
      providesTags: ['Favorite'],
    }),

    toggleFavorite: builder.mutation<
      { recipe_id: string; is_favorite: boolean },
      string
    >({
      queryFn: async (recipeId) => {
        try {
          const {
            data: { user },
            error: authError,
          } = await supabase.auth.getUser()

          if (authError || !user) {
            return { error: { message: 'Требуется авторизация' } }
          }

          const { data: existing, error: checkError } = await supabase
            .from('favorites')
            .select('id')
            .eq('user_id', user.id)
            .eq('recipe_id', recipeId)
            .maybeSingle()

          if (checkError && checkError.code !== 'PGRST116') {
            return { error: checkError }
          }

          if (existing) {
            const { error: delError } = await supabase
              .from('favorites')
              .delete()
              .eq('id', existing.id)

            if (delError) return { error: delError }

            return { data: { recipe_id: recipeId, is_favorite: false } }
          } else {
            const { error: insError } = await supabase
              .from('favorites')
              .insert({ user_id: user.id, recipe_id: recipeId })

            if (insError) return { error: insError }

            return { data: { recipe_id: recipeId, is_favorite: true } }
          }
        } catch {
          return { error: { message: 'Ошибка обновления избранного' } }
        }
      },
      invalidatesTags: ['Favorite', 'Recipe'],
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
  useToggleFavoriteMutation,
} = recipeApi
