import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AtSign, MapPin, Phone, Send } from "lucide-react"

export const metadata = {
  title: "Contacto | Gare7e - Reggaeton Viejo",
  description: "Contacta con el equipo de Gare7e para más información sobre nuestros eventos",
}

export default function ContactoPage() {
  return (
    <div className="container py-24 md:py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-12">Contacto</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Teléfono</h3>
                  <p className="text-sm text-muted-foreground">+34 600 00 00 00</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <AtSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">info@gare7e.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Dirección</h3>
                  <p className="text-sm text-muted-foreground">Calle Principal 123, Madrid, España</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horario de Atención</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Lunes - Viernes</span>
                  <span>10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sábado</span>
                  <span>12:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Domingo</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Nuestra Ubicación</h2>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {/* Iframe de Google Maps aquí */}
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Mapa de ubicación</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nombre
                    </label>
                    <Input id="name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Asunto
                  </label>
                  <Input id="subject" placeholder="Asunto del mensaje" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={8} />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">¿Cómo puedo comprar entradas?</h3>
                  <p className="text-sm text-muted-foreground">
                    Puedes comprar entradas para nuestros eventos a través de nuestra web en la sección de eventos.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">¿Hacéis eventos privados?</h3>
                  <p className="text-sm text-muted-foreground">
                    Sí, organizamos eventos privados. Contáctanos para más información.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">¿Cómo puedo ser DJ en Gare7e?</h3>
                  <p className="text-sm text-muted-foreground">
                    Envíanos tu información y un ejemplo de tu sesión a través del formulario de contacto.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
