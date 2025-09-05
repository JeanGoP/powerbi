import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGear } from "react-icons/fa6";
import { MdOutlineOutput } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { LanguageContext } from "../../context/context";
import { useContext, useState } from 'react';
import ModalCambioClave from "../modalCambioClave";
import { toast } from "react-toastify";
import { CambioClave } from '../../services/ServicioConsumo';
const Navbar = () => {
    const rutalogin = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleCerrarLogin = () => {
        rutalogin("/login");
        sessionStorage.setItem('SessionToken', undefined);
        sessionStorage.setItem('Usuario', undefined);
        sessionStorage.setItem('nombreusuario', undefined);
    }
    const handleGuardarClave = async (data) => {

        if (data.nuevaClave != data.confirmarClave) {
            toast.info("Las claves son diferentes")
        } else {
            try {
                let Token = sessionStorage.getItem('SessionToken');
                const jsonData = {
                    token: Token,
                    password: data.clave,
                    passwordnew: data.nuevaClave
                }
               
                const response = await CambioClave(jsonData);

                if (response.Error) {
                    toast.error(response.Mensaje);
                } else {
                    setShowModal(false)
                    toast.success('Clave cambiado con exito')
                }
            } catch (error) {
                console.log(error);
                console.error('Error al obtener Informacion:', error.message);
                toast.error('Error:No se encontro el servidor.');
            }

        }


    };

    const { configuracionData = {} } = useContext(LanguageContext);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark fixed-top" data-bs-theme="dark">
                <div className="container-fluid px-4">
                    <a className="navbar-brand nombre__menu" >Mis Reportes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span style={{ marginRight: "10px" }}> {configuracionData?.nombreusuario}</span> <span>
                                        <img
                                            src="/user.jpg"
                                            alt="Usuario"
                                            className="rounded-circle img-fluid"
                                            style={{ width: "32px", height: "32px", objectFit: "cover" }}
                                        />
                                    </span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><button className="dropdown-item disabled"> <FaUser style={{ marginRight: "10px" }} />{configuracionData?.perfil}</button></li>
                                    <li><button className="dropdown-item disabled"> <FaGear style={{ marginRight: "10px" }} />Configuración</button></li>
                                    <li><button className="dropdown-item" onClick={() => setShowModal(true)}><IoMdKey style={{ marginRight: "10px" }} />Cambiar Contraseña</button></li>
                                    <li><button className="dropdown-item" onClick={handleCerrarLogin}><MdOutlineOutput style={{ marginRight: "10px" }} />Salir</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <ModalCambioClave
                show={showModal}
                onClose={() => setShowModal(false)}
                onGuardar={handleGuardarClave}
            />
        </>
    )
}

export default Navbar;