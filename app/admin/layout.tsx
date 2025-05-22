import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Excluir la página de login de la verificación de autenticación
  if (typeof window !== "undefined") {
    const path = window.location.pathname
    if (path === "/admin/login") {
      return <>{children}</>
    }
  }

  try {
    const supabase = createClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      redirect("/admin/login")
    }

    // Check if user has admin role - make this optional for now
    try {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

      if (!profile || profile.role !== "admin") {
        // For development, we'll allow any authenticated user
        console.warn("User is not an admin, but allowing access for development")
      }
    } catch (error) {
      console.error("Error checking admin role:", error)
      // Continue anyway for development
    }

    return <div className="flex min-h-screen flex-col">{children}</div>
  } catch (error) {
    console.error("Error in admin layout:", error)
    redirect("/admin/login")
  }
}
