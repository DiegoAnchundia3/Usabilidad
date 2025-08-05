// Servicio para interactuar con el backend de animales

const API_URL = "http://localhost:4000/api/animals";

export async function fetchAnimals() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener animales");
  return res.json();
}

export async function createAnimal(data: Record<string, any>) {
  const formData = new FormData();
  for (const key in data) {
    const value = data[key];
    if (value !== undefined && value !== null) {
      // Si es objeto/array y no es File, convertir a string
      if (typeof value === "object" && !(value instanceof File)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
  }
  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Error al crear animal");
  return res.json();
}

export async function updateAnimal(id: string, data: Record<string, any>) {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Error al actualizar animal");
  return res.json();
}

export async function deleteAnimal(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar animal");
  return res.json();
}

export async function getAnimalByIdOrName(query: string) {
  const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("No se encontró el animal");
  return res.json();
}
