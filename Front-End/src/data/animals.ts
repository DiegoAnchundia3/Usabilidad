export interface Animal {
  id: string
  name: string
  species: "Perro" | "Gato" | "Otro"
  breed: string
  age: "Cachorro" | "Joven" | "Adulto" | "Senior"
  status: "Disponible" | "Adoptado" | "En Tratamiento"
  location: string
  description: string
  imageUrl: string
}

export const animals: Animal[] = [];
