import { useEffect, useState } from "react";
import { Lector } from "../../types/Lector";
import {
  obtenerLectores,
  activarLector,
  desactivarLector,
} from "../../services/LectorAPI";
import "./Lectores.css";


export function ListarLectores() {
  const [lectores, setLectores] = useState<Lector[]>([]);

  useEffect(() => {
    cargarLectores();
  }, []);

  const cargarLectores = async () => {
    const data = await obtenerLectores();
    setLectores(data);
  };

  const toggleEstado = async (lector: Lector) => {
    if (lector.deleted_at) {
      await activarLector(lector.idLector);
    } else {
      await desactivarLector(lector.idLector);
    }
    cargarLectores();
  };

  const handleAgregarLector = () => {
    console.log("Abrir modal para crear lector");
  };

  return (
    <div className="lectores-container">
      <div className="lectores-header">
        <button className="btn-agregar" onClick={handleAgregarLector}>
          ➕ Añadir lector
        </button>
      </div>

      {/* CARDS */}
      <div className="cards-container">
        {lectores.map((lector) => (
          <div key={lector.idLector} className="lector-card">

            <h3>{lector.nombre}</h3>

            <p>
              <strong>DNI:</strong> {lector.dni}
            </p>

            <p>
              <strong>Teléfono:</strong> {lector.telefono}
            </p>

            <div
              className="estado-toggle"
              onClick={() => toggleEstado(lector)}
            >
              <div
                className={`toggle-slider ${
                  lector.deleted_at ? "inactivo" : "activo"
                }`}
              ></div>

              <span className="toggle-label">Activo</span>
              <span className="toggle-label">Inactivo</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}