export interface Recipe {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  image_url?: string;
  ingredients: string[];
  instructions: string[];
  prep_time: string;
  cook_time: string;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  user_metadata: { username?: string };
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
