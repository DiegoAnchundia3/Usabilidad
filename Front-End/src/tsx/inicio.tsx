"use client"

import { useState } from "react"
import { Header } from "../components/Header"
import { SideMenu } from "../components/SideMenu"
import { VisitorContent } from "../components/VisitorContent"
import { VideoSection } from "../components/VideoSection"

export default function Inicio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen relative bg-gray-100">
      <img
        src="/img/perrosInicio.png"
        alt="Fondo de animales"
        className="absolute inset-0 w-full h-full object-contain z-0 opacity-50 blur-sm"
      />
      <div className="relative z-10">
        <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
        <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <main className="container mx-auto px-4 py-8">
          {/* Sección Hero y Contenido Principal de Visitante */}
          <VisitorContent />

          {/* Sección de Video */}
          <VideoSection />
        </main>
      </div>
    </div>
  )
}
