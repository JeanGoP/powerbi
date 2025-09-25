import React, { useState, useMemo } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaAngleLeft, FaAngleRight, FaChevronLeft, FaChevronRight, FaRegEdit } from "react-icons/fa";
import { GuardarReporte, GuardarUsuario } from "../../services/ServicioConsumo";
import { toast } from "react-toastify";
import ModalReporte from "../modalReporte";

const Reportes = ({ reporteList = [], loading = false,onReload }) => {
  let reportes = [];
  const [showModal, setShowModal] = useState(false);
  const [selectedReporte, setselectedReporte] = useState(null);
  try {
    reportes =
      typeof reporteList === "string"
        ? JSON.parse(reporteList)
        : reporteList || [];
  } catch (error) {
    console.error("Error al parsear reporteList:", error);
  }

  // --- Estados para búsqueda y paginación ---
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Filtrar por nombre ---
  const filteredReportes = useMemo(() => {
    return reportes.filter((u) => {
      const searchLower = search.toLowerCase();
      return (
        u.nombre?.toLowerCase().includes(searchLower) 
      );
    });
  }, [reportes, search]);

  // --- Calcular paginación ---
  const totalPages = Math.ceil(filteredReportes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReportes = filteredReportes.slice(
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
    setselectedReporte(null);  
    setShowModal(true);
  };

  // --- abrir modal en modo "editar"
  const handleEditar = (usuario) => {
    setselectedReporte(usuario);
    setShowModal(true);
  };

  const handleGuardarReporte = async (data) => {
   
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
                id_reporte: data.id_reporte,
                nombre: data.nombre,
                detalle: data.detalle,
                icono: data.icono,
                estado: data.estado,
                urlpowerbi: data.urlpowerbi
            }
            
            const response = await GuardarReporte(jsonData);

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
                    <th>Nombre</th>
                    <th>Detalle</th>
                    <th>Icono</th>
                    <th>Color Icono</th>
                    <th>Estado</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReportes && paginatedReportes.length > 0 ? (
                    paginatedReportes.map((valor) => (
                      <tr key={valor.id}>
                        <td>{valor.nombre}</td>
                        <td>{valor.detalle}</td>
                        <td>{valor.icono}</td>
                        <td>{valor.coloricono}</td>
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

      <ModalReporte 
          show={showModal}
          onClose={() => setShowModal(false)}
          ReporteData={selectedReporte} 
          onGuardar={handleGuardarReporte}
          /> 
    </div>
  );
};

export default Reportes;
