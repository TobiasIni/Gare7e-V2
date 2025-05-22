import Hero from "@/components/hero"
import EventsCalendar from "@/components/events-calendar"
import SpotifySection from "@/components/spotify-section"
import AboutPreview from "@/components/about-preview"
import GalleryPreview from "@/components/gallery-preview"
import ContactCta from "@/components/contact-cta"

export default async function Home() {
  return (
    <div className="flex flex-col gap-12 pb-10">
      <Hero />
      <section id="eventos" className="container py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Próximos Eventos</h2>
        <EventsCalendar />
      </section>

      <section id="spotify" className="container py-12 bg-black/50 rounded-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Nuestra Playlist</h2>
        <SpotifySection />
      </section>

      <section id="nosotros" className="container py-12">
        <AboutPreview />
      </section>

      <section id="galeria" className="container py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Galería</h2>
        <GalleryPreview />
      </section>

      <section id="contacto" className="container py-12">
        <ContactCta />
      </section>
    </div>
  )
}
