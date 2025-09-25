// ModalUsuario.jsx
import React, { useEffect, useState } from "react";
import Select from "react-select";

const ModalUsuario = ({ show, onClose, onGuardar, listaPerfil = [], listaReporte = [], usuarioData }) => {
    const [visible, setVisible] = useState(false);
    const [animate, setAnimate] = useState(false);

    let listaPerfiles = [];
    let listaReportes = [];

    try {
        listaPerfiles =
            typeof listaPerfil === "string" ? JSON.parse(listaPerfil) : listaPerfil || [];
        listaReportes =
            typeof listaReporte === "string" ? JSON.parse(listaReporte) : listaReporte || [];
    } catch (error) {
        console.error("Error al parsear Listado:", error);
    }

    const [formData, setFormData] = useState({
        id_usuario: "0",
        usuario: "",
        nombre: "",
        telefono: "",
        correo: "",
        estado: "1",
        perfil: "",
        reportes: [],
    });

    useEffect(() => {
        if (usuarioData) {
            setFormData({
                id_usuario: String(usuarioData.id || "0"),
                usuario: usuarioData.usuario || "",
                nombre: usuarioData.nombre || "",
                telefono: usuarioData.telefono || "",
                correo: usuarioData.correo || "",
                estado: usuarioData.estado || "",
                perfil: String(usuarioData.perfil || ""),
                reportes: usuarioData.reportes_id
                    ? usuarioData.reportes_id.map((r) => String(r.reportID))
                    : [],
            });
        } else {
            setFormData({
                id_usuario: "0",
                usuario: "",
                nombre: "",
                telefono: "",
                correo: "",
                estado: "1",
                perfil: "",
                reportes: [],
            });
        }
    }, [usuarioData, show]);

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

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        valueContainer: (provided) => ({
            ...provided,
            maxHeight: "120px",
            overflowY: "auto",
        }),
    };

    return (
        <div
            className={`modal fade ${animate ? "show d-block" : "d-block"}`}
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {formData.id_usuario === "0" ? "Nuevo Usuario" : "Editar Usuario"}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label className="form-label">Usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="usuario"
                                    value={formData.usuario}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, usuario: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label className="form-label">Nombre Completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, nombre: e.target.value }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label className="form-label">Teléfono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, telefono: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label className="form-label">Correo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, correo: e.target.value }))
                                    }
                                />
                            </div>
                        </div>

                        <div className="row">
                            {/* PERFIL */}
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label className="form-label">Perfil</label>
                                <Select
                                    styles={customStyles}
                                    options={listaPerfiles.map((p) => ({
                                        value: String(p.id),
                                        label: p.nombre,
                                    }))}
                                    value={
                                        formData.perfil
                                            ? {
                                                value: String(formData.perfil),
                                                label:
                                                    listaPerfiles.find(
                                                        (p) => String(p.id) === String(formData.perfil)
                                                    )?.nombre || "",
                                            }
                                            : null
                                    }
                                    onChange={(selected) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            perfil: selected ? String(selected.value) : "",
                                        }))
                                    }
                                    placeholder="-- Seleccione un perfil --"
                                    isClearable
                                />
                            </div>

                            {/* REPORTES */}
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label className="form-label">Reportes</label>
                                <Select
                                    styles={customStyles}
                                    options={listaReportes.map((r) => ({
                                        value: String(r.id),
                                        label: r.nombre,
                                    }))}
                                    value={listaReportes
                                        .filter((r) => formData.reportes.includes(String(r.id)))
                                        .map((r) => ({ value: String(r.id), label: r.nombre }))}
                                    onChange={(selected) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            reportes: selected ? selected.map((s) => String(s.value)) : [],
                                        }))
                                    }
                                    isMulti
                                    placeholder="-- Seleccione reportes --"
                                    closeMenuOnSelect={false}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-sm-12 col-md-6 d-flex align-items-center">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="estadoSwitch"
                                        checked={formData.estado === "1"}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                estado: e.target.checked ? "1" : "0",
                                            }))
                                        }
                                    />
                                    <label className="form-check-label" htmlFor="estadoSwitch">
                                        {formData.estado === "1" ? "Activo" : "Inactivo"}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="btn btn-primary" onClick={() => onGuardar(formData)}>
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalUsuario;
