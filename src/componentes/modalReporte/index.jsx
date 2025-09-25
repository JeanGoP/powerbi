// ModalUsuario.jsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FaChartBar, FaChartLine, FaChartPie } from "react-icons/fa";
import { FaChartGantt } from "react-icons/fa6";
import { LuChartNetwork, LuChartNoAxesCombined } from "react-icons/lu";
const ModalReporte = ({ show, onClose, onGuardar, ReporteData }) => {
    const [visible, setVisible] = useState(false);
    const [animate, setAnimate] = useState(false);
    const nombreIcono = ["FaChartBar", "FaChartGantt", "FaChartLine", "FaChartPie", "LuChartNetwork", "LuChartNoAxesCombined"]
    const iconOptions = [
        { value: "FaChartBar", label: "FaChartBar", icon: <FaChartBar /> },
        { value: "FaChartGantt", label: "FaChartGantt", icon: <FaChartGantt /> },
        { value: "FaChartLine", label: "FaChartLine", icon: <FaChartLine /> },
        { value: "FaChartPie", label: "FaChartPie", icon: <FaChartPie /> },
        { value: "LuChartNetwork", label: "LuChartNetwork", icon: <LuChartNetwork /> },
        { value: "LuChartNoAxesCombined", label: "LuChartNoAxesCombined", icon: <LuChartNoAxesCombined /> },
    ];
    const [formData, setFormData] = useState({
        id_reporte: "0",
        nombre: "",
        detalle: "",
        icono: "",
        estado: "1",
        urlpowerbi: ""

    });

    useEffect(() => {
        if (ReporteData) {
            setFormData({
                id_reporte: String(ReporteData.id || "0"),
                nombre: ReporteData.nombre || "",
                detalle: ReporteData.detalle || "",
                icono: ReporteData.icono || "",
                estado: ReporteData.estado || "",
                urlpowerbi: ReporteData.urlpowerbi || ""
            });
        } else {
            setFormData({
                id_reporte: "0",
                nombre: "",
                detalle: "",
                icono: "",
                estado: "1",
                urlpowerbi: ""
            });
        }
    }, [ReporteData, show]);

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
                            {formData.id_reporte === "0" ? "Nuevo Usuario" : "Editar Usuario"}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label className="form-label">Nombre </label>
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
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label className="form-label">Detalle</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="detalle"
                                    value={formData.detalle}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, detalle: e.target.value }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">

                            <div className="mb-3 col-sm-12 col-md-6">
                                <label className="form-label">Ícono</label>
                                <Select
                                    options={iconOptions}
                                    value={iconOptions.find((opt) => opt.value === formData.icono) || null}
                                    onChange={(selected) =>
                                        setFormData((prev) => ({ ...prev, icono: selected ? selected.value : "" }))
                                    }
                                    styles={{
                                        option: (provided, state) => ({
                                            ...provided,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }),
                                    }}
                                    formatOptionLabel={(option) => (
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            {option.icon}
                                            <span>{option.label}</span>
                                        </div>
                                    )}
                                    placeholder="Selecciona un ícono..."
                                />
                            </div>

                            <div className="mb-3 col-sm-12 col-md-6">
                                <label className="form-label">URL Power BI</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="urlpowerbi"
                                    value={formData.urlpowerbi}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, urlpowerbi: e.target.value }))
                                    }
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

export default ModalReporte;
