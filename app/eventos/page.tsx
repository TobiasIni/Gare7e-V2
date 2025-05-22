import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Ticket, CalendarDays, Share2 } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Eventos | Gare7e - Reggaeton Viejo",
  description: "Descubre los próximos eventos de Gare7e, la mejor fiesta de reggaeton viejo",
}

type Event = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  ticketUrl: string
  price: string
  image?: string
}

export default async function EventosPage() {
  // Get events from Supabase
  // const supabase = createClient()
  // const { data } = await supabase.from('events').select('*').order('date', { ascending: true })

  // Dummy events for preview
  const upcomingEvents: Event[] = [
    {
      id: "1",
      title: "Gare7e: Edición Especial",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "22:00",
      location: "Club XYZ, Madrid",
      description: "Una noche especial con los mejores temas del reggaeton viejo.",
      ticketUrl: "https://example.com/tickets",
      price: "15€",
      image: "/placeholder.svg?height=400&width=800",
    },
    {
      id: "2",
      title: "Gare7e: Old School Session",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "23:00",
      location: "Sala ABC, Barcelona",
      description: "Old school reggaeton para los verdaderos fans.",
      ticketUrl: "https://example.com/tickets",
      price: "18€",
      image: "/placeholder.svg?height=400&width=800",
    },
    {
      id: "3",
      title: "Gare7e: Summer Party",
      date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "21:00",
      location: "Beach Club, Valencia",
      description: "Celebra el verano con los mejores hits del reggaeton viejo.",
      ticketUrl: "https://example.com/tickets",
      price: "20€",
      image: "/placeholder.svg?height=400&width=800",
    },
  ]

  const pastEvents: Event[] = [
    {
      id: "4",
      title: "Gare7e: Noche de Perreo",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "22:00",
      location: "Club DEF, Madrid",
      description: "Una noche de perreo intenso con los mejores clásicos.",
      ticketUrl: "#",
      price: "15€",
      image: "/placeholder.svg?height=400&width=800",
    },
    {
      id: "5",
      title: "Gare7e: Daddy Yankee Tribute",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "23:00",
      location: "Sala GHI, Sevilla",
      description: "Tributo al Big Boss con todos sus éxitos.",
      ticketUrl: "#",
      price: "18€",
      image: "/placeholder.svg?height=400&width=800",
    },
  ]

  return (
    <div className="container py-24 md:py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Eventos</h1>

      <Tabs defaultValue="upcoming" className="mb-8">
        <TabsList className="mb-8">
          <TabsTrigger value="upcoming">Próximos Eventos</TabsTrigger>
          <TabsTrigger value="past">Eventos Pasados</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="space-y-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div
                      className="h-48 md:h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${event.image})` }}
                    />
                  </div>

                  <div className="p-6 md:col-span-2">
                    <CardHeader className="px-0 pt-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-2xl">{event.title}</CardTitle>
                        <Badge variant="outline" className="bg-primary/10">
                          {event.price}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="px-0 py-2">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(event.date).toLocaleDateString("es-ES", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>

                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>

                        <p className="text-muted-foreground pt-2">{event.description}</p>
                      </div>
                    </CardContent>

                    <CardFooter className="px-0 pt-4 flex flex-wrap gap-3">
                      <Button asChild>
                        <Link href={event.ticketUrl} target="_blank">
                          <Ticket className="mr-2 h-4 w-4" />
                          Comprar Entradas
                        </Link>
                      </Button>

                      <Button variant="outline">
                        <Share2 className="mr-2 h-4 w-4" />
                        Compartir
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="space-y-8">
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div
                      className="h-48 md:h-full bg-cover bg-center grayscale"
                      style={{ backgroundImage: `url(${event.image})` }}
                    />
                  </div>

                  <div className="p-6 md:col-span-2">
                    <CardHeader className="px-0 pt-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-2xl">{event.title}</CardTitle>
                        <Badge variant="outline" className="bg-muted">
                          Finalizado
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="px-0 py-2">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(event.date).toLocaleDateString("es-ES", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>

                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>

                        <p className="text-muted-foreground pt-2">{event.description}</p>
                      </div>
                    </CardContent>

                    <CardFooter className="px-0 pt-4">
                      <Button variant="outline">
                        <Share2 className="mr-2 h-4 w-4" />
                        Compartir
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
