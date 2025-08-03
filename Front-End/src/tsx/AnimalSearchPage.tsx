"use client"

import { useState, useEffect } from "react"
import { Header } from "../components/Header"
import { SideMenu } from "../components/SideMenu"
import { AnimalSearchFilters } from "../components/AnimalSearchFilters"
import { AnimalCard } from "../components/AnimalCard"
import { animals, type Animal } from "../data/animals"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../components/UI/button"

export default function AnimalSearchPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>(animals)

  const handleSearch = (filters: {
    searchTerm: string
    species: string
    age: string
    status: string
    location: string
  }) => {
    const { searchTerm, species, age, status, location } = filters

    const results = animals.filter((animal) => {
      const matchesSearchTerm =
        !searchTerm ||
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSpecies = species === "Todas" || animal.species === species
      const matchesAge = age === "Todas" || animal.age === age
      const matchesStatus = status === "Todos" || animal.status === status
      const matchesLocation = !location || animal.location.toLowerCase().includes(location.toLowerCase())

      return matchesSearchTerm && matchesSpecies && matchesAge && matchesStatus && matchesLocation
    })
    setFilteredAnimals(results)
  }

  // Ejecutar la búsqueda inicial al cargar el componente para mostrar todos los animales
  useEffect(() => {
    handleSearch({ searchTerm: "", species: "Todas", age: "Todas", status: "Todos", location: "" })
  }, [])

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
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 mb-8 shadow-lg border border-white/20 animate-fade-in-up">
            <div className="flex items-center mb-6">
              <Link to="/inicio" className="mr-4">
                <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Búsqueda Avanzada de Animales</h1>
            </div>

            <AnimalSearchFilters onSearch={handleSearch} totalResults={filteredAnimals.length} />

            {filteredAnimals.length === 0 && (
              <div className="text-center text-gray-600 text-lg mt-8 p-4 bg-white/90 rounded-xl shadow-md border border-gray-200">
                No se encontraron animales que coincidan con los filtros.
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
