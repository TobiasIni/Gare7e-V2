"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Ticket, CalendarDays, ArrowRight } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type Event = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  ticketUrl: string
  price: string
}

const EventsCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [view, setView] = useState("upcoming")

  // Function to fetch events from Supabase
  const fetchEvents = async () => {
    try {
      const supabase = createClient()

      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })

      if (error) {
        console.error("Error fetching events:", error)
        return
      }

      if (data && data.length > 0) {
        // Map database column names to component property names if needed
        const mappedEvents = data.map((event) => ({
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          description: event.description,
          ticketUrl: event.ticket_url,
          price: event.price,
        }))
        setEvents(mappedEvents)
      } else {
        // Use dummy data when no events are found
        setEvents(dummyEvents)
      }
    } catch (error) {
      console.error("Error in fetchEvents:", error)
      // Continue with dummy data
      setEvents(dummyEvents)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  // Filter events based on selected date
  useEffect(() => {
    if (view === "date" && date) {
      const selected = date.toISOString().split("T")[0]
      setFilteredEvents(events.filter((event) => event.date === selected))
    } else {
      // For 'upcoming' view, show all future events
      const today = new Date().toISOString().split("T")[0]
      setFilteredEvents(events.filter((event) => event.date >= today))
    }
  }, [date, events, view])

  // Function to highlight event dates in the calendar
  const eventDates = events.map((event) => new Date(event.date))

  // Dummy events for preview
  const dummyEvents: Event[] = [
    {
      id: "1",
      title: "Gare7e: Edición Especial",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "22:00",
      location: "Club XYZ, Madrid",
      description: "Una noche especial con los mejores temas del reggaeton viejo.",
      ticketUrl: "https://example.com/tickets",
      price: "15€",
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
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="md:sticky md:top-24 h-min">
        <CardHeader>
          <CardTitle>Calendario de Eventos</CardTitle>
          <CardDescription>Selecciona una fecha para ver los eventos</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            // Highlight dates with events
            modifiers={{
              booked: eventDates,
            }}
            modifiersStyles={{
              booked: {
                fontWeight: "bold",
                backgroundColor: "hsl(var(--primary) / 0.2)",
                color: "hsl(var(--primary))",
              },
            }}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setDate(new Date())}>
            Hoy
          </Button>
          <Tabs defaultValue="upcoming" onValueChange={setView} value={view}>
            <TabsList>
              <TabsTrigger value="upcoming">Próximos</TabsTrigger>
              <TabsTrigger value="date">Por Fecha</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold">
          {view === "upcoming" ? "Próximos Eventos" : "Eventos para la fecha seleccionada"}
        </h3>

        {dummyEvents.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No hay eventos programados para esta fecha.</p>
            </CardContent>
          </Card>
        ) : (
          dummyEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden group">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{event.title}</CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    {event.price}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pb-2">
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

                  <p className="text-sm text-muted-foreground pt-2">{event.description}</p>
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                  <Link href={event.ticketUrl} target="_blank">
                    <Ticket className="mr-2 h-4 w-4" />
                    Comprar Entradas
                    <ArrowRight className="ml-2 h-4 w-4 opacity-70" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}

        <div className="text-center pt-4">
          <Button asChild variant="outline">
            <Link href="/eventos">
              Ver Todos los Eventos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EventsCalendar
