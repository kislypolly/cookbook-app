export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          id: string
          title: string
          description?: string | null
          ingredients: string[]
          steps: string[]
          prep_time?: string | null
          servings: number
          category?: string | null
          author: string
          created_at: string
          updated_at?: string | null
        }
      }
    }
  }
}
