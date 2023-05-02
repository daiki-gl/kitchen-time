export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          created_at: string | null
          directions: Json | null
          id: number
          ingredients: Json | null
          serves: number | null
          thumbnail: string | null
          tips: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          directions?: Json | null
          id?: number
          ingredients?: Json | null
          serves?: number | null
          thumbnail?: string | null
          tips?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          directions?: Json | null
          id?: number
          ingredients?: Json | null
          serves?: number | null
          thumbnail?: string | null
          tips?: string | null
          title?: string | null
          user_id?: string | null
        }
      }
      users: {
        Row: {
          avatar: string | null
          bio: string | null
          cover_image: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          cover_image?: string | null
          created_at?: string | null
          id: string
          name: string
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          cover_image?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
