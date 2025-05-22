import { createClient as createSupabaseClient } from "@supabase/supabase-js"

let client: ReturnType<typeof createSupabaseClient> | null = null

export const createClient = () => {
  if (client) return client

  // Verificar que las variables de entorno estén definidas
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing")
    // Proporcionar valores por defecto para evitar errores en desarrollo
    client = createSupabaseClient("https://your-project.supabase.co", "your-anon-key")
    return client
  }

  client = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  return client
}
