import { useEffect, useState } from "react";
import { EjemplaresModal } from "./EjemplaresModal";
import "./ListarLibros.css";
import { API_BASE_URL } from "../../API";

interface Libro {
  idLibro: number;
  titulo: string;
  autores: string[];
  disponible: boolean;
}

interface Props {
  search: string;
}

export function ListarLibros({ search }: Props) {

  const [libros, setLibros] = useState<Libro[]>([]);
  const [libroSeleccionado, setLibroSeleccionado] =
    useState<Libro | null>(null);

    
  useEffect(() => {
  const texto = search.trim();

  const url =
    texto === ""
      ? `${API_BASE_URL}/libros`
      : `${API_BASE_URL}/libros/buscar/${texto}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        return [];
      }
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        setLibros(data);
      } else {
        setLibros([]);
      }
    })
    .catch((err) => {
      console.error("Error al cargar libros", err);
      setLibros([]);
    });

}, [search]);

  // 🔥 ACTUALIZACIÓN OPTIMISTA
  const actualizarDisponibilidad = (idLibro: number) => {

    setLibros(prev =>
      prev.map(libro =>
        libro.idLibro === idLibro
          ? { ...libro, disponible: true }
          : libro
      )
    );

  };

  return (
    <>
      <div className="cards-container">
        {Array.isArray(libros) && libros.map((libro) => (
          <div
            className="libro-card"
            key={libro.idLibro}
            onClick={() => setLibroSeleccionado(libro)}
          >
            <h3 className="titulo">
              {libro.titulo}
            </h3>

            <p className="autor">
              <strong>Autor:</strong>
              {libro.autores?.join(", ") || "Sin autor"}
            </p>

            <span
              className={`estado ${
                libro.disponible
                  ? "disponible"
                  : "no-disponible"
              }`}
            >
              {libro.disponible
                ? "Disponible"
                : "No disponible"}
            </span>

          </div>
        ))}
      </div>

      {libroSeleccionado && (
        <EjemplaresModal
          idLibro={libroSeleccionado.idLibro}
          titulo={libroSeleccionado.titulo}
          onClose={() => setLibroSeleccionado(null)}
          onEjemplarCreado={actualizarDisponibilidad}
        />
      )}
    </>
  );
}