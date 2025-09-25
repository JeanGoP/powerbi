import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExpand, FaCompress } from "react-icons/fa";
import { toast } from 'react-toastify';
import "./configuracion.css";
import { FaGear, FaLocationDot } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { TbFileReport } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import Usuario from "../../componentes/usuario";
import { ListarUsuario } from "../../services/ServicioConsumo";
import { LanguageContext } from "../../context/context";
import { useContext } from "react";
import Reportes from "../../componentes/reportes";

const Configuracion = () => {
    const { configuracionData = [], getCofiguracion } = useContext(LanguageContext);
    const [usuariosList, setUsuariosList] = useState([]);
    const [perfilesList, setPerfilesList] = useState([]);
    const [reportesList, setReportesList] = useState([]);
    const [reportesCompletos, setreportesCompletos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    useEffect(() => {
        if (configuracionData) {
            let Token = sessionStorage.getItem('SessionToken');
            let user = sessionStorage.getItem('Usuario');
            let usernombre = sessionStorage.getItem('nombreusuario');
            if (Token && user) {
                getCofiguracion(Token, Token, 'token');
            } else {
                navigate('/login');
            }
        }
    }, []);

    const ListarUsuarios = async () => {
      const formDataSend = new FormData();
      let Tokens = sessionStorage.getItem('SessionToken');
      formDataSend.append("usuario", Tokens);
    
      try {
        setLoading(true); 
        const response = await ListarUsuario(formDataSend);
        if (!response.Error) {
          setUsuariosList(response.Resultado.jsonUsuarios);
          setPerfilesList(response.Resultado.jsonPerfiles);
          setReportesList(response.Resultado.jsonReportes);
          setreportesCompletos(response.Resultado.jsonReportesCompletos);
        } else {
          toast.error(response.Mensaje);
        }
      } catch (error) {
        console.error("Error al listar usuarios:", error);
        toast.error("Hubo un error al listar usuarios.");
      } finally {
        setLoading(false); 
      }
    };
    
    useEffect(() => {
      ListarUsuarios();
    }, []);
      
  return (
    <div className="container" style={{paddingTop:"80px"}}>
    <ul className="nav nav-tabs tabs__admin" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="tab6-tab" data-bs-toggle="tab" data-bs-target="#tab6" type="button" role="tab" aria-controls="tab6" aria-selected="true"><BiUser /> Usuarios</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true"><TbFileReport /> Reportes</button>
      </li>
    </ul>
    <div className="tab-content p-3 border border-top-0">
      <div className="tab-pane fade show active" id="tab6" role="tabpanel" aria-labelledby="tab6-tab">
        <Usuario 
            usuarioList={usuariosList} 
            loading={loading} 
            listaPerfiles={perfilesList} 
            listaReportes={reportesList} 
            onReload={ListarUsuarios}
        />

      </div>
      <div className="tab-pane fade show" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
      <Reportes 
            reporteList={reportesCompletos} 
            loading={loading} 
            onReload={ListarUsuarios}
        />
  
      </div>
    </div>
  </div>
  );
};

export default Configuracion;

