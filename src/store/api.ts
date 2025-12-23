import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../lib/supabase'
import { Recipe } from '../types/recipe'

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
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { error: { message: 'Требуется авторизация' } };
      }

      const { steps, ...cleanRecipe } = recipe;
      
      const validCategories = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'];
      const category = validCategories.includes(cleanRecipe.category?.toLowerCase()) 
        ? cleanRecipe.category.toLowerCase() 
        : 'lunch';
      
      const recipeWithUser = { 
        ...cleanRecipe,
        user_id: user.id,
        category,
        instructions: steps || cleanRecipe.instructions || [],
        ingredients: cleanRecipe.ingredients || []
      };
      
      const { data, error } = await supabase
        .from('recipes')
        .insert(recipeWithUser);
      
      if (error) {
        return { error: { message: error.message } };
      }
      
      return { data: data?.[0] };
    } catch (error: any) {
      return { error: { message: 'Ошибка создания рецепта' } };
    }
  },
  invalidatesTags: ['Recipe'],
}),

    updateRecipe: builder.mutation<Recipe, { id: string } & Omit<Recipe, 'id' | 'created_at' | 'author' >>({
      queryFn: async (recipe) => {
        const { data, error } = await supabase
          .from('recipes')
          .update({ 
            ...recipe, 
            user_id: supabase.auth.getUser().data.user?.id,
            updated_at: new Date().toISOString() 
          })
          .eq('id', recipe.id)
          .select()
          .single()
        
        if (error) return { error }
        return { data }
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
  }),
})

export const { 
  useGetRecipesQuery, 
  useGetRecipeByIdQuery, 
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation
} = recipeApi
