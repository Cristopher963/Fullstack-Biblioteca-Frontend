import { API_BASE_URL } from "./API";

export const obtenerLectores = async () => {
  const res = await fetch(`${API_BASE_URL}/lectores`);
  return res.json();
};

export const crearLector = async (lector: any) => {
  const res = await fetch(`${API_BASE_URL}/lectores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lector),
  });

  return res.json();
};

export const desactivarLector = async (id: number) => {
  await fetch(`${API_BASE_URL}/lectores/${id}/desactivar`, {
    method: "PUT",
  });
};

export const activarLector = async (id: number) => {
  await fetch(`${API_BASE_URL}/lectores/${id}/activar`, {
    method: "PUT",
  });
};