"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Heart, Calendar, MapPin, Phone } from "lucide-react"
import { Button } from "../components/UI/button"
import { Input } from "../components/UI/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/UI/card"
// import { Badge } from "../components/UI/badge" // No existe Badge
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/UI/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/UI/dialog" // No existe Dialog
// import { Label } from "../components/UI/label" // No existe Label
// import { Textarea } from "../components/UI/textarea" // No existe Textarea
// import { Avatar, AvatarFallback, AvatarImage } from "../components/UI/avatar" // No existe Avatar

interface Pet {
  id: string
  name: string
  breed: string
  age: number
  status: "Disponible" | "Adoptado" | "En Tratamiento"
  image: string
  description: string
  owner?: string
  phone?: string
  location: string
  vaccinated: boolean
  sterilized: boolean
}

const mockPets: Pet[] = [
  {
    id: "1",
    name: "Luna",
    breed: "Golden Retriever",
    age: 3,
    status: "Disponible",
    image: "/placeholder.svg?height=200&width=200",
    description: "Luna es una perra muy cariñosa y juguetona. Le encanta correr en el parque.",
    location: "Madrid, España",
    vaccinated: true,
    sterilized: true,
  },
  {
    id: "2",
    name: "Max",
    breed: "Pastor Alemán",
    age: 5,
    status: "Adoptado",
    image: "/placeholder.svg?height=200&width=200",
    description: "Max es un perro muy leal y protector. Ideal para familias con niños.",
    owner: "Carlos García",
    phone: "+34 666 123 456",
    location: "Barcelona, España",
    vaccinated: true,
    sterilized: false,
  },
  {
    id: "3",
    name: "Mia",
    breed: "Siamés",
    age: 2,
    status: "En Tratamiento",
    image: "/placeholder.svg?height=200&width=200",
    description: "Mia es una gata muy elegante y tranquila. Necesita cuidados especiales.",
    location: "Valencia, España",
    vaccinated: true,
    sterilized: true,
  },
  {
    id: "4",
    name: "Rocky",
    breed: "Bulldog Francés",
    age: 4,
    status: "Disponible",
    image: "/placeholder.svg?height=200&width=200",
    description: "Rocky es un perro muy sociable y divertido. Le gusta estar con personas.",
    location: "Sevilla, España",
    vaccinated: false,
    sterilized: true,
  },
]

export default function PetManagement() {
  // Navegación atrás
  function handleGoBack() {
    window.history.back();
  }
  const [pets, setPets] = useState<Pet[]>(mockPets)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ageFilter, setAgeFilter] = useState("all")
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  // Imagen para agregar mascota
  const [addImage, setAddImage] = useState<string>("");
  // Imagen para editar mascota
  const [editImage, setEditImage] = useState<string>("");

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || pet.id.includes(searchTerm);
    // Determinar tipo por raza (simplificado)
    const petType = pet.breed.toLowerCase().includes("gato") || pet.breed.toLowerCase().includes("siamés") ? "Gato" : "Perro";
    const matchesType = typeFilter === "all" || petType === typeFilter;
    const matchesStatus = statusFilter === "all" || pet.status === statusFilter;
    const matchesAge =
      ageFilter === "all" ||
      (ageFilter === "young" && pet.age <= 2) ||
      (ageFilter === "adult" && pet.age > 2 && pet.age <= 7) ||
      (ageFilter === "senior" && pet.age > 7);

    return matchesSearch && matchesType && matchesStatus && matchesAge;
  });

  const getStatusColor = (status: Pet["status"]) => {
    switch (status) {
      case "Disponible":
        return "bg-green-100 text-green-800 border-green-200"
      case "Adoptado":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "En Tratamiento":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }
  // Elimino cierre de llave extra

  const handleDeletePet = (petId: string) => {
    setPets(pets.filter((pet) => pet.id !== petId))
  } 
   // Función para agregar mascota
  function handleAddPet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const newPet = {
      id: Date.now().toString(),
      name: (form.name as any).value,
      breed: (form.species as any).value,
      age: Number((form.age as any).value),
      description: (form.description as any).value,
      status: "Disponible",
      image: addImage,
      sterilized: false,
      vaccinated: false,
      location: "",
    };
    setPets((prev: any) => [...prev, newPet]);
    setAddImage("");
    setIsAddDialogOpen(false);
  }

  // Función para editar mascota
  function handleEditPetSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!selectedPet) return;
    setPets((prev: any) => prev.map((pet: any) =>
      pet.id === selectedPet.id
        ? {
            ...pet,
            name: (form["edit-name"] as any).value,
            breed: (form["edit-species"] as any).value,
            age: Number((form["edit-age"] as any).value),
            status: (form["edit-status"] as any).value,
            description: (form["edit-description"] as any).value,
            image: editImage || pet.image,
          }
        : pet
    ));
    setEditImage("");
    setIsEditDialogOpen(false);
  }

  const handleEditPet = (pet: Pet) => {
    setSelectedPet(pet)
    setIsEditDialogOpen(true)
  }

  const breeds = [...new Set(pets.map((pet) => pet.breed))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 relative">
      {/* Botón regresar */}
      <button
        onClick={handleGoBack}
        className="absolute top-6 left-6 bg-white border border-gray-300 rounded-full px-4 py-2 shadow hover:bg-gray-100 z-50"
      >
        ← Regresar
      </button>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Sistema de Gestión de Mascotas</h1>
          <p className="text-purple-100 text-xl">Busca, edita y gestiona la información de las mascotas</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="w-5 h-5" />
              Buscar y Filtrar Mascotas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-medium text-white mb-1">Buscar por ID o nombre</label>
                <Input
                  placeholder="Buscar por ID o nombre..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="bg-white/20 border-white/30 text-black placeholder:text-gray-700"
                />
              </div>
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-medium text-white mb-1">Tipo de animal</label>
                <select
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                  className="w-full rounded border border-white/30 bg-white/30 text-black py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="all">Todos</option>
                  <option value="Gato">Gato</option>
                  <option value="Perro">Perro</option>
                </select>
              </div>
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-medium text-white mb-1">Estado</label>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full rounded border border-white/30 bg-white/30 text-black py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="all">Todos</option>
                  <option value="Disponible">Disponible</option>
                  <option value="Adoptado">Adoptado</option>
                  <option value="En Tratamiento">En Tratamiento</option>
                </select>
              </div>
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-medium text-white mb-1">Edad</label>
                <select
                  value={ageFilter}
                  onChange={e => setAgeFilter(e.target.value)}
                  className="w-full rounded border border-white/30 bg-white/30 text-black py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="all">Todas</option>
                  <option value="young">Joven (0-2 años)</option>
                  <option value="adult">Adulto (3-7 años)</option>
                  <option value="senior">Senior (8+ años)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-white/80">
                Mostrando {filteredPets.length} de {pets.length} mascotas
              </p>

              {isAddDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50" style={{minHeight: '100vh'}}>
                  <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 border-2 border-black flex flex-col justify-center" style={{margin: 0, minHeight: '420px', display: 'flex', justifyContent: 'center'}}>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Agregar Nueva Mascota</h2>
                      <button onClick={() => { setIsAddDialogOpen(false); setAddImage(""); }} className="text-gray-500 hover:text-gray-700">×</button>
                    </div>
                    <form onSubmit={handleAddPet} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <Input id="name" name="name" placeholder="Nombre de la mascota" required />
                      </div>
                      <div>
                        <label htmlFor="species" className="block text-sm font-medium text-gray-700">Especie</label>
                        <select id="species" name="species" required className="w-full rounded border border-gray-300 p-2">
                          <option value="">Selecciona</option>
                          <option value="Gato">Gato</option>
                          <option value="Perro">Perro</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Edad</label>
                        <Input id="age" name="age" type="number" placeholder="Edad en años" required />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea id="description" name="description" placeholder="Descripción de la mascota" className="w-full border rounded p-2" rows={3} required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Imagen (opcional)</label>
                        <input type="file" accept="image/*" onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new window.FileReader();
                            reader.onload = ev => setAddImage(ev.target?.result as string);
                            reader.readAsDataURL(file);
                          } else {
                            setAddImage("");
                          }
                        }} />
                        {addImage && (
                          <img src={addImage} alt="Preview" className="mt-2 rounded max-h-32 mx-auto" />
                        )}
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white" type="submit">Agregar Mascota</Button>
                    </form>
                  </div>
                </div>
              )}
              <Button className="bg-green-600 hover:bg-green-700 mt-4" onClick={() => setIsAddDialogOpen(true)}>
                <span className="mr-2">+</span> Agregar Mascota
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pet Grid */}
        {isEditDialogOpen && selectedPet && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 border-2 border-black">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Editar Mascota</h2>
                <button onClick={() => { setIsEditDialogOpen(false); setEditImage(""); }} className="text-gray-500 hover:text-gray-700">×</button>
              </div>
              <form onSubmit={handleEditPetSubmit} className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <Input id="edit-name" name="edit-name" defaultValue={selectedPet.name} required />
                </div>
                <div>
                  <label htmlFor="edit-species" className="block text-sm font-medium text-gray-700">Especie</label>
                  <select id="edit-species" name="edit-species" defaultValue={selectedPet.breed} required className="w-full rounded border border-gray-300 p-2">
                    <option value="">Selecciona</option>
                    <option value="Gato">Gato</option>
                    <option value="Perro">Perro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-age" className="block text-sm font-medium text-gray-700">Edad</label>
                  <Input id="edit-age" name="edit-age" type="number" defaultValue={selectedPet.age} required />
                </div>
                <div>
                  <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700">Estado</label>
                  <select id="edit-status" name="edit-status" defaultValue={selectedPet.status} className="w-full border rounded p-2">
                    <option value="Disponible">Disponible</option>
                    <option value="Adoptado">Adoptado</option>
                    <option value="En Tratamiento">En Tratamiento</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea id="edit-description" name="edit-description" defaultValue={selectedPet.description} className="w-full border rounded p-2" rows={3} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Imagen (opcional)</label>
                  <input type="file" accept="image/*" onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new window.FileReader();
                      reader.onload = ev => setEditImage(ev.target?.result as string);
                      reader.readAsDataURL(file);
                    } else {
                      setEditImage("");
                    }
                  }} />
                  {(editImage || selectedPet.image) && (
                    <img src={editImage || selectedPet.image} alt="Preview" className="mt-2 rounded max-h-32 mx-auto" />
                  )}
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit">Guardar Cambios</Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

