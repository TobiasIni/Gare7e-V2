import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          filter: "brightness(0.3)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center gap-6 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg max-w-5xl">
          <span className="text-primary">GARE7E</span> <br />
          El Mejor Reggaeton Viejo
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Revive los clásicos del reggaeton que marcaron una época. La fiesta con la mejor selección de hits del
          reggaeton old school.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button asChild size="lg" className="text-base">
            <Link href="/eventos">
              <CalendarDays className="mr-2 h-5 w-5" />
              Próximos Eventos
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="#spotify">Escuchar Playlist</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-white/70 mb-2">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </div>
  )
}

export default Hero
