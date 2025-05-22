import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const GalleryPreview = () => {
  // Dummy images for preview
  const images = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    src: `/placeholder.svg?height=400&width=600`,
    alt: `Evento Gare7e ${i + 1}`,
  }))

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="aspect-square md:aspect-[4/3] overflow-hidden rounded-lg bg-muted hover:opacity-90 transition-opacity cursor-pointer group"
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button asChild>
          <Link href="/galeria">
            Ver Galería Completa
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default GalleryPreview
