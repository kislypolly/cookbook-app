export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string; // "30 мин"
  cookTime: string; // "1 час"
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';
  createdAt: string;
}

export interface RecipesState {
  items: Recipe[];
  loading: boolean;
  error: string | null;
  currentRecipe: Recipe | null;
}

export const difficulties = ['easy', 'medium', 'hard'] as const;
export const categories = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'] as const;
