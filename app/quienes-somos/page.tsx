import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Quienes Somos | Gare7e - Reggaeton Viejo",
  description: "Conoce más sobre Gare7e, la mejor fiesta de reggaeton viejo en España",
}

export default function QuienesSomosPage() {
  return (
    <div className="container py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Quienes Somos</h1>

        <div className="prose prose-lg dark:prose-invert mb-12">
          <p>
            Gare7e nació en 2018 con la misión de revivir la época dorada del reggaeton, trayendo de vuelta los éxitos
            que marcaron generaciones y creando una experiencia única para los amantes del género.
          </p>

          <h2>Nuestra historia</h2>
          <p>
            Todo comenzó cuando un grupo de amigos apasionados por el reggaeton viejo decidieron crear un espacio donde
            se pudiera disfrutar de los clásicos que ya no sonaban en los clubs. Lo que empezó como una pequeña fiesta
            entre amigos, rápidamente se convirtió en un fenómeno que atrajo a cientos de personas nostálgicas de la
            época dorada del género.
          </p>

          <p>
            Desde entonces, Gare7e ha crecido hasta convertirse en una de las fiestas de reggaeton old school más
            importantes del país, recorriendo las principales ciudades y llenando salas con personas deseosas de revivir
            aquellos éxitos que marcaron una generación.
          </p>

          <h2>Nuestro equipo</h2>
          <p>Detrás de Gare7e hay un equipo de profesionales apasionados por la música y el entretenimiento:</p>

          <ul>
            <li>Leonardo Olivera</li>
            <li>Laura Gómez - Directora de eventos</li>
            <li>Y un equipo de colaboradores que hacen posible cada evento</li>
          </ul>

          <h2>Nuestra misión</h2>
          <p>
            En Gare7e, nuestra misión es simple: crear experiencias únicas e inolvidables alrededor de la música que nos
            apasiona. Queremos que cada evento sea un viaje en el tiempo, donde puedas desconectar del presente y
            sumergirte en aquellos años donde el reggaeton comenzaba a conquistar el mundo.
          </p>

          <h2>¿Por qué "Gare7e"?</h2>
          <p>
            El nombre "Gare7e" es un juego de palabras que combina "garete" (una expresión del argot caribeño que
            significa dejarse llevar) y el número "7", un número que simboliza la suerte y la perfección en muchas
            culturas. Así, Gare7e representa la idea de dejarse llevar por la música hasta alcanzar ese estado perfecto
            de diversión y nostalgia.
          </p>
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/contacto">Contacta con nosotros</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
