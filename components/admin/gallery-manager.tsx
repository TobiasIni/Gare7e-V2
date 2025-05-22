"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash, Upload, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Gallery = {
  id: string
  title: string
  date: string
  images: string[]
}

export default function GalleryManager() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null)

  const supabase = createClient()

  const fetchGalleries = async () => {
    setLoading(true)

    try {
      const { data, error } = await supabase.from("galleries").select("*").order("date", { ascending: false })

      if (error) throw error

      setGalleries(data || [])
      if (data && data.length > 0) {
        setSelectedGallery(data[0].id)
      }
    } catch (error) {
      console.error("Error fetching galleries:", error)
      // Use dummy data for preview
      const dummyGalleries = [
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
      ]
      setGalleries(dummyGalleries)
      setSelectedGallery(dummyGalleries[0].id)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleries()
  }, [])

  const resetForm = () => {
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
    })
    setUploadedImages([])
    setEditingGallery(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files)
    setUploadedImages((prev) => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingGallery) {
        // Update existing gallery
        const { error } = await supabase
          .from("galleries")
          .update({
            title: formData.title,
            date: formData.date,
          })
          .eq("id", editingGallery.id)

        if (error) throw error

        // Upload new images if any
        if (uploadedImages.length > 0) {
          // Implementation for uploading images would go here
          // For this example, we'll just simulate success
        }
      } else {
        // Create new gallery
        const { data, error } = await supabase
          .from("galleries")
          .insert([
            {
              title: formData.title,
              date: formData.date,
              images: [],
            },
          ])
          .select()

        if (error) throw error

        // Upload images if any
        if (uploadedImages.length > 0 && data) {
          // Implementation for uploading images would go here
          // For this example, we'll just simulate success
        }
      }

      // Refresh galleries list
      fetchGalleries()
      // Close form
      setFormOpen(false)
      // Reset form
      resetForm()
    } catch (error) {
      console.error("Error saving gallery:", error)
    }
  }

  const handleDeleteGallery = async (id: string) => {
    try {
      const { error } = await supabase.from("galleries").delete().eq("id", id)

      if (error) throw error

      // Refresh galleries list
      fetchGalleries()
    } catch (error) {
      console.error("Error deleting gallery:", error)
    }
  }

  const handleDeleteImage = async (galleryId: string, imageUrl: string) => {
    try {
      // Find gallery
      const gallery = galleries.find((g) => g.id === galleryId)
      if (!gallery) return

      // Filter out the image
      const updatedImages = gallery.images.filter((img) => img !== imageUrl)

      // Update gallery
      const { error } = await supabase
        .from("galleries")
        .update({
          images: updatedImages,
        })
        .eq("id", galleryId)

      if (error) throw error

      // Refresh galleries list
      fetchGalleries()
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Gestión de Galería</h2>
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Galería
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingGallery ? "Editar Galería" : "Crear Nueva Galería"}</DialogTitle>
              <DialogDescription>Complete los detalles de la galería y suba imágenes.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Imágenes</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-upload")?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Subir Imágenes
                    </Button>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <p className="text-xs text-muted-foreground">Selecciona múltiples imágenes para subir</p>
                  </div>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="space-y-2">
                    <Label>Imágenes seleccionadas</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {uploadedImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt={`Upload ${index}`}
                            className="h-20 w-full object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Galerías</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Cargando galerías...</div>
          ) : galleries.length === 0 ? (
            <div className="text-center py-4">No hay galerías. Crea una nueva.</div>
          ) : (
            <Tabs value={selectedGallery || galleries[0].id} onValueChange={setSelectedGallery}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  {galleries.map((gallery) => (
                    <TabsTrigger key={gallery.id} value={gallery.id}>
                      {gallery.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("gallery-image-upload")?.click()}
                    disabled={!selectedGallery}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Añadir Imágenes
                  </Button>
                  <Input
                    id="gallery-image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      // Implementation would go here
                    }}
                  />
                </div>
              </div>

              {galleries.map((gallery) => (
                <TabsContent key={gallery.id} value={gallery.id}>
                  <div className="mb-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">{gallery.title}</h3>
                      <p className="text-sm text-muted-foreground">{new Date(gallery.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingGallery(gallery)
                          setFormData({
                            title: gallery.title,
                            date: gallery.date,
                          })
                          setFormOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeleteGallery(gallery.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Gallery ${gallery.title} - Image ${index + 1}`}
                          className="h-40 w-full object-cover rounded-md"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteImage(gallery.id, image)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {gallery.images.length === 0 && (
                      <div className="col-span-full text-center py-8">
                        <p className="text-muted-foreground">
                          No hay imágenes en esta galería. Añade algunas imágenes.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
