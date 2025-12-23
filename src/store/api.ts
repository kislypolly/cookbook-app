import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../lib/supabase'
import { Recipe } from '../types/recipe'

// Supabase прямые запросы
export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Recipe'],
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
      queryFn: async ({ id }) => {
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
        const { data, error } = await supabase
          .from('recipes')
          .insert(recipe)
          .select()
          .single()
        
        if (error) return { error }
        return { data }
      },
      invalidatesTags: ['Recipe'],
    }),
  }),
})

export const { 
  useGetRecipesQuery, 
  useGetRecipeByIdQuery, 
  useCreateRecipeMutation 
} = recipeApi
