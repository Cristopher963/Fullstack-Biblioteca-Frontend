import { useState, useEffect } from "react";
import "./CrearLibro.css";
import { CrearAutorModal } from "./CrearAutorModal";
import { API_BASE_URL } from "../../API";

export function CrearLibro() {

    const [titulo, setTitulo] = useState("");
    const [isbn, setIsbn] = useState("");
    const [editorial, setEditorial] = useState("");
    const [anioPublicacion, setAnioPublicacion] = useState<number | "">("");
    const [autores, setAutores] = useState<any[]>([]);
    const [autorSeleccionado, setAutorSeleccionado] = useState<string[]>([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoAutor, setNuevoAutor] = useState({
        nombres: "",
        apellidos: "",
        nacionalidad: "",
        fechaNacimiento: ""
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/autores`)
        .then(res => res.json())
        .then(data => setAutores(data))
        .catch(err => console.error(err));
    }, []);

    const handleCrearAutor = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/autores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoAutor)
        });

        if (!response.ok) {
        throw new Error("Error al crear autor");
        }

        const autorCreado = await response.json();

        setAutores(prev => [...prev, autorCreado]);
        setAutorSeleccionado(prev => [...prev, autorCreado.idAutor]);
        setMostrarModal(false);

    } catch (error) {
        console.error(error);
    }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nuevoLibro = {
        titulo,
        isbn,
        editorial,
        anioPublicacion: anioPublicacion === "" ? null : Number(anioPublicacion),
        autorIds: autorSeleccionado
        };

        try {
        await fetch(`${API_BASE_URL}/libros`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoLibro)
        });

        alert("Libro creado correctamente");

        } catch (error) {
        console.error(error);
        }
    };

    return (
        <div className="crear-c-container">
        <div className="crear-c-card">
            <h2>Nuevo Libro</h2>

            <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                />
                <label>Título</label>
            </div>

            <div className="input-group">
                <select
                    value={autorSeleccionado[0] || ""}
                    onChange={(e) => setAutorSeleccionado([e.target.value])}
                    >
                    <option value="">Seleccione autor</option>
                    {autores.map((autor) => (
                        <option key={autor.idAutor} value={autor.idAutor}>
                        {autor.nombres} {autor.apellidos}
                        </option>
                    ))}
                </select>
                <label>Autor(es)</label>
            </div>

            <div className="input-group">
                <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
                />
                <label>ISBN</label>
            </div>

            <div className="input-group">
                <input
                type="text"
                value={editorial}
                onChange={(e) => setEditorial(e.target.value)}
                required
                />
                <label>Editorial</label>
            </div>

            <div className="input-group">
                <input
                type="number"
                value={anioPublicacion}
                onChange={(e) =>
                    setAnioPublicacion(
                    e.target.value === "" ? "" : Number(e.target.value)
                    )
                }
                required
                />
                <label>Año</label>
            </div>

            <div>
                <button type="button" onClick={() => setMostrarModal(true)}>
                + Nuevo autor
                </button>
            </div>

            <button type="submit">Crear libro</button>
            </form>
            {mostrarModal && (
                <CrearAutorModal
                    onClose={() => setMostrarModal(false)}
                    onAutorCreado={(autor) => {
                    setAutores(prev => [...prev, autor]);
                    setAutorSeleccionado(prev => [...prev, autor.idAutor]);
                    }}
                />
            )}
        </div>
        </div>
    );
}