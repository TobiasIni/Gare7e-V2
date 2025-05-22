import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Galería | Gare7e - Reggaeton Viejo",
  description: "Revive los mejores momentos de las fiestas de Gare7e en nuestra galería de imágenes",
}

type Gallery = {
  id: string
  title: string
  date: string
  images: string[]
}

export default async function GaleriaPage() {
  // Get galleries from Supabase
  // const supabase = createClient()
  // const { data } = await supabase.from('galleries').select('*').order('date', { ascending: false })

  // Dummy galleries for preview
  const galleries: Gallery[] = [
    {
      id: "1",
      title: "Gare7e: Noche de Perreo",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      images: Array.from({ length: 8 }, (_, i) => `/placeholder.svg?height=600&width=800`),
    },
    {
      id: "2",
      title: "Gare7e: Daddy Yankee Tribute",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      images: Array.from({ length: 12 }, (_, i) => `/placeholder.svg?height=600&width=800`),
    },
    {
      id: "3",
      title: "Gare7e: Summer Party",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      images: Array.from({ length: 10 }, (_, i) => `/placeholder.svg?height=600&width=800`),
    },
  ]

  return (
    <div className="container py-24 md:py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Galería</h1>

      <Tabs defaultValue={galleries[0].id} className="mb-8">
        <TabsList className="mb-8 flex flex-wrap">
          {galleries.map((gallery) => (
            <TabsTrigger key={gallery.id} value={gallery.id}>
              {gallery.title}
              <Badge variant="outline" className="ml-2">
                {new Date(gallery.date).toLocaleDateString("es-ES", {
                  month: "short",
                  year: "numeric",
                })}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {galleries.map((gallery) => (
          <TabsContent key={gallery.id} value={gallery.id}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg bg-muted hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${gallery.title} - Imagen ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
