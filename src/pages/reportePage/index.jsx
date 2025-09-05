import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import "./reporte.css";

const ReportePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const url = location.state?.url;

    return (
 
        <div className="reporte-container" style={{ marginTop: "100px", marginBottom:"100px" }}>
        {/* Botón de volver */}
        <button className="btn-volver" onClick={() => navigate("/home")}>
          <FaArrowLeft size={20} />
        </button>
  
        {/* Contenedor centrado */}
        <div className="d-flex justify-content-center align-items-center h-100">
          {url ? (
            <div className="iframe-wrapper">
              <iframe
                src={url}
                title="Reporte PowerBI"
                className="iframe-reporte"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="mensaje-error">No se encontró el reporte</p>
          )}
        </div>
      </div>
    );
};

export default ReportePage;
