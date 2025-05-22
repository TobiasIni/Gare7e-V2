"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

type SiteSettings = {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  spotifyPlaylistUrl: string
  instagramUrl: string
  facebookUrl: string
  twitterUrl: string
  youtubeUrl: string
}

type UserSettings = {
  receiveNotifications: boolean
  newsletterFrequency: string
  language: string
}

export default function SettingsManager() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: "Gare7e",
    siteDescription: "La mejor fiesta de reggaeton viejo",
    contactEmail: "info@gare7e.com",
    contactPhone: "+34 600 00 00 00",
    contactAddress: "Calle Principal 123, Madrid, España",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/37i9dQZF1DXbSbnqxMTGx9",
    instagramUrl: "https://instagram.com",
    facebookUrl: "https://facebook.com",
    twitterUrl: "https://twitter.com",
    youtubeUrl: "https://youtube.com",
  })

  const [userSettings, setUserSettings] = useState<UserSettings>({
    receiveNotifications: true,
    newsletterFrequency: "weekly",
    language: "es",
  })

  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from("settings").select("*").single()

      if (error) throw error

      if (data) {
        setSiteSettings(data.site || siteSettings)
        setUserSettings(data.user_settings || userSettings)
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
      // Using default values from state
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleSiteInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSiteSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    setUserSettings((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleSwitchChange = (checked: boolean, name: string) => {
    setUserSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const saveSettings = async () => {
    setLoading(true)

    try {
      const { error } = await supabase.from("settings").upsert({
        id: 1, // assuming single row for settings
        site: siteSettings,
        user_settings: userSettings,
      })

      if (error) throw error

      toast({
        title: "Configuración guardada",
        description: "Los cambios se han guardado correctamente.",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Ha ocurrido un error al guardar la configuración.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Configuración</h2>

      <Tabs defaultValue="site">
        <TabsList className="mb-6">
          <TabsTrigger value="site">Sitio Web</TabsTrigger>
          <TabsTrigger value="user">Usuario</TabsTrigger>
        </TabsList>

        <TabsContent value="site">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
                <CardDescription>Configura la información básica del sitio web.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nombre del Sitio</Label>
                  <Input id="siteName" name="siteName" value={siteSettings.siteName} onChange={handleSiteInputChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Descripción</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={siteSettings.siteDescription}
                    onChange={handleSiteInputChange}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
                <CardDescription>Configura la información de contacto mostrada en el sitio.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de Contacto</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={handleSiteInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Teléfono de Contacto</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={siteSettings.contactPhone}
                    onChange={handleSiteInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactAddress">Dirección</Label>
                  <Textarea
                    id="contactAddress"
                    name="contactAddress"
                    value={siteSettings.contactAddress}
                    onChange={handleSiteInputChange}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Redes Sociales</CardTitle>
                <CardDescription>Configura los enlaces a tus redes sociales.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="spotifyPlaylistUrl">URL de Playlist de Spotify</Label>
                  <Input
                    id="spotifyPlaylistUrl"
                    name="spotifyPlaylistUrl"
                    value={siteSettings.spotifyPlaylistUrl}
                    onChange={handleSiteInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagramUrl">Instagram</Label>
                    <Input
                      id="instagramUrl"
                      name="instagramUrl"
                      value={siteSettings.instagramUrl}
                      onChange={handleSiteInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebookUrl">Facebook</Label>
                    <Input
                      id="facebookUrl"
                      name="facebookUrl"
                      value={siteSettings.facebookUrl}
                      onChange={handleSiteInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitterUrl">Twitter</Label>
                    <Input
                      id="twitterUrl"
                      name="twitterUrl"
                      value={siteSettings.twitterUrl}
                      onChange={handleSiteInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtubeUrl">YouTube</Label>
                    <Input
                      id="youtubeUrl"
                      name="youtubeUrl"
                      value={siteSettings.youtubeUrl}
                      onChange={handleSiteInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Usuario</CardTitle>
              <CardDescription>Configura tus preferencias personales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="receiveNotifications">Recibir Notificaciones</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones sobre nuevos eventos y actualizaciones.
                  </p>
                </div>
                <Switch
                  id="receiveNotifications"
                  checked={userSettings.receiveNotifications}
                  onCheckedChange={(checked) => handleSwitchChange(checked, "receiveNotifications")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newsletterFrequency">Frecuencia de Newsletter</Label>
                <select
                  id="newsletterFrequency"
                  name="newsletterFrequency"
                  value={userSettings.newsletterFrequency}
                  onChange={handleUserInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                  <option value="never">Nunca</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <select
                  id="language"
                  name="language"
                  value={userSettings.language}
                  onChange={handleUserInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </div>
  )
}
