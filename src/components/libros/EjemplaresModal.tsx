import { useEffect, useState } from "react";
import "./EjemplaresModal.css";

interface Ejemplar {
  idEjemplar: number;
  codigoInventario: string;
  estado: string;
}

interface Props {
  idLibro: number;
  titulo: string;
  onClose: () => void;
  onEjemplarCreado: (idLibro: number) => void;
}

export function EjemplaresModal({
  idLibro,
  titulo,
  onClose,
  onEjemplarCreado
}: Props) {

  const [ejemplares, setEjemplares] =
    useState<Ejemplar[]>([]);

  const [codigoInventario, setCodigoInventario] =
    useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/ejemplares/libro/${idLibro}`)
      .then(res => res.json())
      .then(data => setEjemplares(data))
      .catch(err =>
        console.error("Error cargando ejemplares", err)
      );
  }, [idLibro]);

  const agregarEjemplar = async () => {

    if (codigoInventario.trim() === "") {
      alert("Ingrese código inventario");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8080/api/ejemplares",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idLibro,
            codigoInventario
          })
        }
      );

      const nuevo = await response.json();

      // Actualiza lista del modal
      setEjemplares(prev => [...prev, nuevo]);

      // 🔥 Actualiza padre SIN refetch
      onEjemplarCreado(idLibro);

      setCodigoInventario("");

    } catch (error) {
      console.error(error);
    }
  };

  const disponibles =
    ejemplares.filter(e =>
      e.estado === "disponible"
    ).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >

        <h2>{titulo}</h2>

        <hr />

        <p>
          <strong>Total ejemplares:</strong>
          {ejemplares.length}
        </p>

        <p>
          <strong>Disponibles:</strong>
          {disponibles}
        </p>

        <hr />

        <h3>Agregar Ejemplar</h3>

        <input
          type="text"
          placeholder="Código inventario"
          value={codigoInventario}
          onChange={(e) =>
            setCodigoInventario(e.target.value)
          }
        />

        <button onClick={agregarEjemplar}>
          Agregar Ejemplar
        </button>

        <hr />

        <button onClick={onClose}>
          Cerrar
        </button>

      </div>
    </div>
  );
}