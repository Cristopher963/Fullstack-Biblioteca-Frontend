import { useState } from "react";
import { ListarLibros } from "./components/listarLibros";
import { CrearLibro } from "./components/CrearLibro";
import { ListarLectores } from "./components/Lectores";
import { Lector } from "./Lector";
import "./App.css";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [vista, setVista] = useState<"libros" | "crear" | "lectores">("libros");
  const [lectores, setLectores] = useState<Lector[]>([]);

  return (
    <div className="layout">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <h2 className="logo">
          {collapsed ? "📚" : "📚 Biblioteca"}
        </h2>

        <nav>
          <button
            className={`nav-item ${vista === "libros" ? "active" : ""}`}
            onClick={() => setVista("libros")}
          >
            📖 {!collapsed && "Libros"}
          </button>

          <button
            className={`nav-item ${vista === "crear" ? "active" : ""}`}
            onClick={() => setVista("crear")}
          >
            📦 {!collapsed && "Crear libro"}
          </button>

          <button className="nav-item">
            📦 {!collapsed && "Préstamos"}
          </button>

          <button className="nav-item">
            👤 {!collapsed && "Usuarios"}
          </button>

          <button 
          className={`nav-item ${vista === "lectores" ? "active" : ""}`}
          onClick={() => setVista("lectores")}>
            👤 {!collapsed && "Lectores"}
          </button>
        </nav>
      </aside>

      <div className="main">
        <header className="topbar">
          <button
            className="menu-toggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            ☰
          </button>

          {vista === "libros" && (
            <div className="search-bar">
              <input
                placeholder="Buscar libro..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          <div className="user-info">
            👤 user (rol)
          </div>
        </header>

        <div className="content">
          {vista === "libros" && <ListarLibros search={search} />}
          {vista === "crear" && <CrearLibro />}
          {vista === "lectores" && <ListarLectores />}
        </div>
      </div>
    </div>
  );
}

export default App;