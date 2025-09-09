import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExpand, FaCompress } from "react-icons/fa";
import "./reporte.css";

const ReportePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.state?.url;
  const nombreReport = location.state?.nombreReporte;

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const wrapper = document.querySelector(".iframe-wrapper");
    if (!wrapper) return;

    if (!document.fullscreenElement) {
      if (wrapper.requestFullscreen) wrapper.requestFullscreen();
      else if (wrapper.mozRequestFullScreen) wrapper.mozRequestFullScreen();
      else if (wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen();
      else if (wrapper.msRequestFullscreen) wrapper.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="reporte-container" style={{ marginTop: "100px", marginBottom: "100px" }}>
      {/* Botón de volver */}
      <button className="btn-volver" onClick={() => navigate("/home")}>
        <FaArrowLeft size={20} />
      </button>
        <div className="Titulo__reporte">
          <p>{nombreReport}</p>
        </div>

      <div className="d-flex justify-content-center align-items-center h-100">
        {url ? (
          <div className={`iframe-wrapper ${isFullscreen ? "fullscreen-active" : ""}`}>
            <iframe
              src={url}
              title="Reporte PowerBI"
              className="iframe-reporte"
              frameBorder="0"
              allowFullScreen
            />
        
            <div className="cover"></div>
         
      {url && (
        <button className="btn-expand" onClick={toggleFullscreen}>
          {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
        </button>
      )}
          </div>
        ) : (
          <p className="mensaje-error">No se encontró el reporte</p>
        )}
      </div>
    </div>
  );
};

export default ReportePage;

