"use client"

import { useState } from "react"
import { Input } from "./UI/input"
import { Button } from "./UI/button"
import { Card, CardContent, CardHeader, CardTitle } from "./UI/card"
import { Search, XCircle, Filter, PawPrint, Calendar, MapPin, Heart } from "lucide-react"

interface AnimalSearchFiltersProps {
  onSearch: (filters: {
    searchTerm: string
    species: string
    age: string
    status: string
    location: string
  }) => void
  totalResults: number
}

export function AnimalSearchFilters({ onSearch, totalResults }: AnimalSearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [species, setSpecies] = useState("Todas")
  const [age, setAge] = useState("Todas")
  const [status, setStatus] = useState("Todos")
  const [location, setLocation] = useState("")

  const handleSearch = () => {
    onSearch({ searchTerm, species, age, status, location })
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSpecies("Todas")
    setAge("Todas")
    setStatus("Todos")
    setLocation("")
    onSearch({ searchTerm: "", species: "Todas", age: "Todas", status: "Todos", location: "" })
  }

  return (
    <Card className="bg-white/95 backdrop-blur-md rounded-xl p-6 mb-8 shadow-lg border border-white/20 animate-fade-in-up">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Search className="h-6 w-6 text-purple-600" />
          Buscar Animales
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primera fila: Búsqueda + Filtros principales - todos al mismo nivel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Campo de búsqueda principal */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Búsqueda</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar por nombre o raza..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Especie */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <PawPrint className="h-4 w-4" /> Especie
            </label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
            >
              <option value="Todas">Todas</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Edad */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Edad
            </label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
            >
              <option value="Todas">Todas</option>
              <option value="Cachorro">Cachorro</option>
              <option value="Joven">Joven</option>
              <option value="Adulto">Adulto</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Heart className="h-4 w-4" /> Estado
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
            >
              <option value="Todos">Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="Adoptado">Adoptado</option>
              <option value="En Tratamiento">En Tratamiento</option>
            </select>
          </div>
        </div>

        {/* Segunda fila: Ubicación + Botones + Resultados */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          {/* Ubicación */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <MapPin className="h-4 w-4" /> Ubicación
            </label>
            <Input
              type="text"
              placeholder="Ej: Refugio Central"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="py-2 border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Botones más pequeños */}
          <Button
            onClick={handleSearch}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Aplicar
          </Button>

          <Button
            onClick={handleClearFilters}
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Limpiar
          </Button>

          {/* Conteo de resultados */}
          <div className="text-center text-sm text-gray-600">
            {totalResults} {totalResults === 1 ? "resultado encontrado" : "resultados encontrados"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
