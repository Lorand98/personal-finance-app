export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      balance: {
        Row: {
          created_at: string
          current: number
          expenses: number
          id: number
          income: number
          user_id: string
        }
        Insert: {
          created_at?: string
          current: number
          expenses: number
          id?: number
          income: number
          user_id: string
        }
        Update: {
          created_at?: string
          current?: number
          expenses?: number
          id?: number
          income?: number
          user_id?: string
        }
        Relationships: []
      }
      budgets: {
        Row: {
          category: Database["public"]["Enums"]["transaction_categories"]
          created_at: string
          id: number
          maximum: number
          theme: Database["public"]["Enums"]["theme_colors"]
          user_id: string
        }
        Insert: {
          category: Database["public"]["Enums"]["transaction_categories"]
          created_at?: string
          id?: number
          maximum: number
          theme: Database["public"]["Enums"]["theme_colors"]
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["transaction_categories"]
          created_at?: string
          id?: number
          maximum?: number
          theme?: Database["public"]["Enums"]["theme_colors"]
          user_id?: string
        }
        Relationships: []
      }
      pots: {
        Row: {
          created_at: string
          id: number
          name: string
          target: number
          theme: string
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          target: number
          theme: string
          total: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          target?: number
          theme?: string
          total?: number
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          avatar: string | null
          category: Database["public"]["Enums"]["transaction_categories"]
          created_at: string
          date: string
          id: number
          name: string
          recurring: boolean
          user_id: string
        }
        Insert: {
          amount: number
          avatar?: string | null
          category: Database["public"]["Enums"]["transaction_categories"]
          created_at?: string
          date: string
          id?: number
          name: string
          recurring: boolean
          user_id: string
        }
        Update: {
          amount?: number
          avatar?: string | null
          category?: Database["public"]["Enums"]["transaction_categories"]
          created_at?: string
          date?: string
          id?: number
          name?: string
          recurring?: boolean
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fn_get_unused_categories: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      fn_get_unused_colors: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
    }
    Enums: {
      theme_colors:
        | "#277C78"
        | "#F2CDAC"
        | "#82C9D7"
        | "#626070"
        | "#C94736"
        | "#826CB0"
        | "#597C7C"
        | "#93674F"
        | "#934F6F"
        | "#3F82B2"
        | "#97A0AC"
        | "#7F9161"
        | "#CAB361"
        | "#BE6C49"
      transaction_categories:
        | "General"
        | "Dining Out"
        | "Groceries"
        | "Entertainment"
        | "Transportation"
        | "Lifestyle"
        | "Personal Care"
        | "Education"
        | "Bills"
        | "Shopping"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
