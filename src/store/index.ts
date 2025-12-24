import { configureStore } from '@reduxjs/toolkit'
import { recipeApi } from './api'
import authReducer from './authSlice'
import recipeReducer from './recipeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
