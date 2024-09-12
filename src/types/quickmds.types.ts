import { PostgrestError } from "@supabase/supabase-js"

import { Database } from "@/types/database.types"

export type Supabase<N extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][N]["Row"]

export type Post = Supabase<"posts">

export interface APIError {
  error_at: string
  error: PostgrestError | null
  message: string
}
