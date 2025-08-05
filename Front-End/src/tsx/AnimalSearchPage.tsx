"use client"

import { useState, useEffect } from "react"
import { Header } from "../components/Header"
import { AnimalSearchFilters } from "../components/AnimalSearchFilters"
import { AnimalCard } from "../components/AnimalCard"
import { animals, type Animal } from "../data/animals"


export default function AnimalSearchPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <Header onMenuToggle={() => {}} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Buscar Animales</h1>
        <AnimalSearchFilters onSearch={handleSearch} totalResults={filteredAnimals.length} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredAnimals.length === 0 ? (
            <div className="col-span-3 text-center text-blue-700 font-semibold">No se encontraron animales.</div>
          ) : (
            filteredAnimals.map((animal) => <AnimalCard key={animal.id} animal={animal} />)
          )}
        </div>
      </main>
    </div>
  )
}
