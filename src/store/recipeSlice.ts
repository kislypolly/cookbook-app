import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { Recipe, RecipesState } from '../types/recipe'
import { supabase } from '../lib/supabase'
import type { RootState } from './store'

const initialState: RecipesState = {
  items: [],
  loading: false,
  error: null,
  currentRecipe: null,
}

// загрузка рецептов из Supabase
export const fetchRecipes = createAsyncThunk<Recipe[]>(
  'recipes/fetchRecipes',
  async () => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return (data ?? []) as Recipe[]
  }
)

// обновление рецепта
export const updateRecipe = createAsyncThunk<
  Recipe,
  { id: string; updates: Partial<Recipe> },
  { state: RootState }
>(
  'recipes/updateRecipe',
  async ({ id, updates }, { getState }) => {
    const { auth } = getState()
    const userId = auth.user?.id

    const { data, error } = await supabase
      .from('recipes')
      .update({ ...updates, user_id: userId })
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      throw error
    }

    return data as Recipe
  }
)

// удаление рецепта
export const deleteRecipe = createAsyncThunk<
  string,
  string,
  { state: RootState }
>(
  'recipes/deleteRecipe',
  async (id, { getState }) => {
    const { auth } = getState()
    const userId = auth.user?.id

    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) {
      throw error
    }

    return id
  }
)

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setCurrentRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.currentRecipe = action.payload
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.items.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchRecipes
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка загрузки рецептов'
      })

      // updateRecipe
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.loading = false
        const index = state.items.findIndex((r) => r.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка обновления рецепта'
      })

      // deleteRecipe
      .addCase(deleteRecipe.pending, (state) => {
        state.error = null
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r.id !== action.payload)
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка удаления рецепта'
      })
  },
})

export const { setCurrentRecipe, addRecipe } = recipeSlice.actions
export default recipeSlice.reducer
