import { useState, useEffect } from "react"

interface Props {
  onClose: () => void;
  onAutorCreado: (autor: any) => void;
}

export function CrearAutorModal({ onClose, onAutorCreado }: Props) {
  const [nuevoAutor, setNuevoAutor] = useState({
    nombres: "",
    apellidos: "",
    nacionalidad: "",
    fechaNacimiento: ""
  });

  const handleCrearAutor = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/autores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoAutor)
    });

    const autorCreado = await response.json();
    onAutorCreado(autorCreado);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Nuevo Autor</h3>

        <form onSubmit={handleCrearAutor}>

          <div className="input-group">
            <input
              type="text"
              required
              value={nuevoAutor.nombres}
              onChange={(e) =>
                setNuevoAutor({ ...nuevoAutor, nombres: e.target.value })
              }
            />
            <label>Nombres</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              required
              value={nuevoAutor.apellidos}
              onChange={(e) =>
                setNuevoAutor({ ...nuevoAutor, apellidos: e.target.value })
              }
            />
            <label>Apellidos</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              required
              value={nuevoAutor.nacionalidad}
              onChange={(e) =>
                setNuevoAutor({ ...nuevoAutor, nacionalidad: e.target.value })
              }
            />
            <label>Nacionalidad</label>
          </div>

          <div className="input-group">
            <input
              type="date"
              required
              value={nuevoAutor.fechaNacimiento}
              onChange={(e) =>
                setNuevoAutor({ ...nuevoAutor, fechaNacimiento: e.target.value })
              }
            />
            <label>Fecha de nacimiento</label>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button type="submit">Guardar Autor</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}