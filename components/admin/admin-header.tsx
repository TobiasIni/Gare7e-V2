"use client"

import { LogOut, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AdminHeaderProps {
  onSignOut: () => void
}

export default function AdminHeader({ onSignOut }: AdminHeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <Music className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Gare7e Admin</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Ver sitio
          </Link>
          <Button variant="ghost" size="sm" onClick={onSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  )
}
