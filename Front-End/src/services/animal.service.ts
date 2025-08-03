// Servicio para interactuar con el backend de animales

const API_URL = "http://localhost:4000/api/animals";

export async function fetchAnimals() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener animales");
  return res.json();
}

export async function createAnimal(data) {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }
  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Error al crear animal");
  return res.json();
}

export async function updateAnimal(id, data) {
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

export async function deleteAnimal(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar animal");
  return res.json();
}

export async function getAnimalByIdOrName(query) {
  const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("No se encontró el animal");
  return res.json();
}
