import React, { useEffect, useState } from "react";

const ModalCambioClave = ({ show, onClose, onGuardar }) => {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [clave, setClave] = useState("");
  const [nuevaClave, setNuevaClave] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");

  useEffect(() => {
    if (show) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`modal fade ${animate ? "show d-block" : "d-block"}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="modal-dialog modal-sm modal-dialog-centered"
       
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cambiar Clave</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Clave Actual</label>
              <input
                type="password"
                className="form-control"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nueva Clave</label>
              <input
                type="password"
                className="form-control"
                value={nuevaClave}
                onChange={(e) => setNuevaClave(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirmar Clave</label>
              <input
                type="password"
                className="form-control"
                value={confirmarClave}
                onChange={(e) => setConfirmarClave(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              onClick={() => onGuardar({ clave, nuevaClave, confirmarClave })}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCambioClave;
