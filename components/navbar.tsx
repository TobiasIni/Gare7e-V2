"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ModeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X, Music } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="flex items-center gap-2">
          <Music className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">Gare7e</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/quienes-somos" className="text-sm font-medium hover:text-primary transition-colors">
            Quienes somos
          </Link>
          <Link href="/eventos" className="text-sm font-medium hover:text-primary transition-colors">
            Próximos eventos
          </Link>
          <Link href="/contacto" className="text-sm font-medium hover:text-primary transition-colors">
            Contacto
          </Link>
          <Link href="/galeria" className="text-sm font-medium hover:text-primary transition-colors">
            Galería
          </Link>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm">
          <div className="container py-4 flex flex-col space-y-4">
            <Link
              href="/quienes-somos"
              className="text-lg font-medium py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Quienes somos
            </Link>
            <Link
              href="/eventos"
              className="text-lg font-medium py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Próximos eventos
            </Link>
            <Link
              href="/contacto"
              className="text-lg font-medium py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <Link
              href="/galeria"
              className="text-lg font-medium py-2 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Galería
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
