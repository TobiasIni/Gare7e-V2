import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube, Music } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Gare7e</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              La mejor fiesta de reggaeton viejo para revivir los mejores éxitos
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quienes-somos" className="text-muted-foreground hover:text-primary transition-colors">
                  Quienes somos
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="text-muted-foreground hover:text-primary transition-colors">
                  Próximos eventos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-muted-foreground hover:text-primary transition-colors">
                  Galería
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link href="https://instagram.com" target="_blank" className="hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://facebook.com" target="_blank" className="hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://youtube.com" target="_blank" className="hover:text-primary transition-colors">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gare7e. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Diseño y desarrollo por <span className="text-primary">Gare7e Team</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
