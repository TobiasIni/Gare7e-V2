"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminHeader from "./admin-header"
import EventsManager from "./events-manager"
import GalleryManager from "./gallery-manager"
import SettingsManager from "./settings-manager"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("events")
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader onSignOut={handleSignOut} />

      <div className="flex-1 container py-8">
        <Tabs defaultValue="events" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="gallery">Galería</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <EventsManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
