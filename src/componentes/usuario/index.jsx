import React, { useState, useMemo } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import "./usuario.css";
import { FaAngleLeft, FaAngleRight, FaChevronLeft, FaChevronRight, FaRegEdit } from "react-icons/fa";
import ModalUsuario from "../modalUsuario";
import { GuardarUsuario } from "../../services/ServicioConsumo";
import { toast } from "react-toastify";

const Usuario = ({ usuarioList = [], loading = false, listaPerfiles = [], listaReportes =[],onReload }) => {
  let usuarios = [];
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  try {
    usuarios =
      typeof usuarioList === "string"
        ? JSON.parse(usuarioList)
        : usuarioList || [];
  } catch (error) {
    console.error("Error al parsear usuarioList:", error);
  }

  // --- Estados para búsqueda y paginación ---
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Filtrar usuarios por nombre ---
  const filteredUsuarios = useMemo(() => {
    return usuarios.filter((u) => {
      const searchLower = search.toLowerCase();
      return (
        u.nombre?.toLowerCase().includes(searchLower) || 
        u.usuario?.toLowerCase().includes(searchLower)  
      );
    });
  }, [usuarios, search]);

  // --- Calcular paginación ---
  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsuarios = filteredUsuarios.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  // --- abrir modal en modo "nuevo"
  const handleNuevo = () => {
    setSelectedUser(null);  
    setShowModal(true);
  };

  // --- abrir modal en modo "editar"
  const handleEditar = (usuario) => {
    setSelectedUser(usuario);
    setShowModal(true);
  };

  const handleGuardarUsuario = async (data) => {
   
    for (const key in data) {
      if (typeof data[key] === 'string' && data[key].trim() === '') {
        toast.warning(`Por favor completa el campo: ${key}`);
        return;
      }
    }

        try {
            let Token = sessionStorage.getItem('SessionToken');
            const jsonData = {
                token: Token,
                id_usuario: data.id_usuario,
                usuario: data.usuario,
                nombre: data.nombre,
                telefono: data.telefono,
                correo: data.correo,
                estado: data.estado,
                perfil: data.perfil,
                reportes: Array.isArray(data.reportes)
                ? data.reportes.join(",")
                : data.reportes,
            }
           // console.log(jsonData)
            const response = await GuardarUsuario(jsonData);

            if (response.Error) {
                toast.error(response.Mensaje);
            } else {
                setShowModal(false)
                toast.success('Proceso ejecutado con exito')

                if (onReload) {
                  onReload();
                }
            }
        } catch (error) {
            console.log(error);
            console.error('Error al obtener Informacion:', error.message);
            toast.error('Error:No se encontro el servidor.');
        }
};
  return (
    <div>
      <div className="mb-3 d-flex justify-content-end">
      <button className="btn btn-success" onClick={handleNuevo}>Nuevo</button>
      </div>

      <hr />
      <div className="row mt-3">
        <div className="col-lg-12">
          {/* Buscador */}
          <div className="mb-3 d-flex justify-content-end">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div style={{ maxHeight: "45vh", overflowY: "auto" }}>
            {loading ? (
              <div className="d-flex justify-content-center my-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Estado</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsuarios && paginatedUsuarios.length > 0 ? (
                    paginatedUsuarios.map((valor) => (
                      <tr key={valor.id}>
                        <td>{valor.usuario}</td>
                        <td>{valor.nombre}</td>
                        <td>{valor.correo}</td>
                        <td>{valor.telefono}</td>
                        <td>
                          {valor.estado === "1" ? (
                            <span className="badge bg-success">Activo</span>
                          ) : (
                            <span className="badge bg-danger">Inactivo</span>
                          )}
                        </td>
                        <td>
                        
                          <FaRegEdit style={{ cursor: "pointer" }} onClick={() => handleEditar(valor)}/>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No hay valores registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {totalPages > 1 && (
            <nav className="d-flex justify-content-end mt-3">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                 <FaAngleLeft style={{position:"relative", top:"-3px"}}/>
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                   <FaAngleRight  style={{position:"relative", top:"-3px"}}/>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      <ModalUsuario 
          show={showModal}
          onClose={() => setShowModal(false)}
          onGuardar={handleGuardarUsuario}
          listaPerfil={listaPerfiles}
          listaReporte={listaReportes}
          usuarioData={selectedUser} 
          />
    </div>
  );
};

export default Usuario;
