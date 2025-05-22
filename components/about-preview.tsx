import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const AboutPreview = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Quienes Somos</h2>
        <div className="space-y-4">
          <p>
            Gare7e nació en 2018 con la misión de revivir la época dorada del reggaeton, trayendo de vuelta los éxitos
            que marcaron generaciones y creando una experiencia única para los amantes del género.
          </p>
          <p>
            Nuestro equipo está formado por DJs y productores apasionados por el reggaeton viejo, comprometidos a crear
            el ambiente perfecto para que revivas los mejores momentos al ritmo de los clásicos que nunca pasan de moda.
          </p>
          <div className="pt-4">
            <Button asChild>
              <Link href="/quienes-somos">
                Conoce Más Sobre Nosotros
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
          <img src="/placeholder.svg?height=400&width=400" alt="Evento Gare7e" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square bg-muted rounded-lg overflow-hidden translate-y-8">
          <img src="/placeholder.svg?height=400&width=400" alt="Evento Gare7e" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square bg-muted rounded-lg overflow-hidden translate-y-4">
          <img src="/placeholder.svg?height=400&width=400" alt="Evento Gare7e" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square bg-muted rounded-lg overflow-hidden -translate-y-4">
          <img src="/placeholder.svg?height=400&width=400" alt="Evento Gare7e" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}

export default AboutPreview
