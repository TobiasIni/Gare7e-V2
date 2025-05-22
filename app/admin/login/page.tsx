"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Music } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      router.push("/admin")
      router.refresh()
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  // Función para crear un usuario de prueba (solo para desarrollo)
  const createTestUser = async () => {
    setLoading(true)
    setError(null)

    try {
      // Primero intentamos iniciar sesión con el usuario de prueba
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "admin@gare7e.com",
        password: "admin123",
      })

      if (!error) {
        router.push("/admin")
        router.refresh()
        return
      }

      // Si hay error, intentamos crear el usuario
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: "admin@gare7e.com",
        password: "admin123",
      })

      if (signUpError) {
        throw signUpError
      }

      setError("Usuario de prueba creado. Por favor, inicia sesión.")
    } catch (error: any) {
      console.error("Error creating test user:", error)
      setError(error.message || "Error al crear usuario de prueba")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Gare7e</span>
            </div>
            <CardTitle className="text-2xl">Acceso Administración</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder al panel de administración</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground text-center">Panel exclusivo para administradores</p>

            {/* Botón para crear usuario de prueba (solo para desarrollo) */}
            <div className="w-full border-t pt-4">
              <Button variant="outline" className="w-full text-xs" onClick={createTestUser} disabled={loading}>
                Crear usuario de prueba (solo desarrollo)
              </Button>
            </div>

            <div className="w-full">
              <Button variant="link" className="w-full text-xs" asChild>
                <Link href="/">Volver al sitio principal</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
