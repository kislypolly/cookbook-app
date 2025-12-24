import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Recipe, RecipesState } from '../types/recipe'

const initialState: RecipesState = {
  items: [],
  loading: false,
  error: null,
  currentRecipe: null,
}

export const fetchRecipes = createAsyncThunk<Recipe[]>(
  'recipes/fetchRecipes',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
      {
        id: '1',
        title: 'Классический борщ',
        description: 'Традиционный украинский борщ с мясом и сметаной',
        ingredients: ['Свёкла', 'Картофель', 'Морковь', 'Капуста', 'Мясо'],
        instructions: ['Обжарить овощи', 'Сварить бульон', 'Добавить свёклу'],
        prepTime: '20 мин',
        cookTime: '2 часа',
        servings: 6,
        difficulty: 'medium',
        image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a',
        category: 'lunch',
        createdAt: '2025-12-23',
      },
      {
        id: '2',
        title: 'Шоколадный торт',
        description: 'Нежный торт с кремом и свежими ягодами',
        ingredients: ['Мука', 'Какао', 'Сахар', 'Яйца', 'Масло'],
        instructions: ['Смешать сухие ингредиенты', 'Добавить жидкие', 'Выпекать'],
        prepTime: '30 мин',
        cookTime: '40 мин',
        servings: 8,
        difficulty: 'easy',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
        category: 'dessert',
        createdAt: '2025-12-22',
      },
    ]
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
  },
})

export const { setCurrentRecipe, addRecipe } = recipeSlice.actions
export default recipeSlice.reducer
