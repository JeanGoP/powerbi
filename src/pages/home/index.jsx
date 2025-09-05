import React, { useContext, useEffect, useState } from 'react';
import Card from '../../componentes/card'
import BotonFlotante from '../../componentes/botonFlotante';
import CardSkeleton from '../../componentes/cardSkeleton';
import { toast } from 'react-toastify';
import { LanguageContext } from '../../context/context';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSyncAlt } from 'react-icons/fa';
export function Home() {
    const jsonReportes = [
        { icono: 'FaChartBar', titulo: 'Reporte General', descripcion: 'Informe de ventas mensual', urlPowerBI: '', colorIcono: '#0d6efd' },
        { icono: 'FaChartLine', titulo: 'Reporte General', descripcion: 'Informe de ventas mensual', urlPowerBI: 'https://app.powerbi.com/view?r=YOUR_REPORT_3', colorIcono: '#0d6efd' },
        { icono: 'FaChartPie', titulo: 'Reporte General', descripcion: 'Informe de ventas mensual', urlPowerBI: 'rr', colorIcono: '#0d6efd' },
        { icono: 'FaChartLine', titulo: 'Reporte General', descripcion: 'Informe de ventas mensual', urlPowerBI: '', colorIcono: '#0d6efd' },
        { icono: 'FaChartPie', titulo: 'Reporte General', descripcion: 'Informe de ventas mensual', urlPowerBI: '', colorIcono: '#0d6efd' },
        { icono: 'FaChartLine', titulo: 'Reporte General', descripcion: 'Informe de ventas mensual', urlPowerBI: '', colorIcono: '#0d6efd' },
        { icono: 'FaChartPie', titulo: 'Reporte General', descripcion: 'Informe de ventas mensual', urlPowerBI: '', colorIcono: '#0d6efd' },
        { icono: 'FaChartLine', titulo: 'Reporte General', descripcion: 'Informe de ventas mensual', urlPowerBI: '', colorIcono: '#0d6efd' },
        { icono: 'FaChartPie', titulo: 'Reporte General', descripcion: 'Informe de ventas mensual', urlPowerBI: '', colorIcono: '#0d6efd' },
        { icono: 'LuChartNoAxesCombined', titulo: 'Reporte General', descripcion: 'Estado de inventario en tiempo real', urlPowerBI: '', colorIcono: '#0d6efd' }
    ]
    const [jsonReportesBI, setjsonReportesBI] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredReportes, setFilteredReportes] = useState([]);
    const { configuracionData = [], getCofiguracion } = useContext(LanguageContext);
    const navigate = useNavigate();
    const location = useLocation();
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

    useEffect(() => {
        if (location.state?.fromLogin) {
          const usuario = sessionStorage.getItem("nombreusuario") || "nombreusuario";
          toast.success(`¡Bienvenido, ${usuario}!`, {
            autoClose: 3000,
          });
        }
      }, [location.state]);
    
      useEffect(() => {
        if (location.state?.fromLogin) {
          window.history.replaceState({}, document.title);
        }
      }, [location.state]);


    useEffect(() => {
        if (configuracionData.jsonReportes) {
            try {
                const parsed = typeof configuracionData.jsonReportes === 'string' ? JSON.parse(configuracionData.jsonReportes) : configuracionData.jsonReportes;
                setjsonReportesBI(parsed);
                setFilteredReportes(parsed);
            } catch (error) {
                console.error('Error al parsear Promociones:', error);
            }
        }
    }, [configuracionData.jsonReportes]);

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setFilteredReportes(jsonReportesBI);
        } else {
            const results = jsonReportesBI.filter((item) =>
                item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredReportes(results);
        }
    };
    const handleRefresh = async () => {
        try {
            let Token = sessionStorage.getItem('SessionToken');
            let user = sessionStorage.getItem('Usuario');

            if (Token && user) {
                await getCofiguracion(Token, Token, 'token');
                setSearchTerm('');
                setFilteredReportes(jsonReportesBI);
                toast.info('Reportes Actualizados.');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error al refrescar reportes:', error);
            toast.error('Error al actualizar los reportes.');
        }
    };
    return (

        <>
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <div className="container" style={{ marginTop: '100px', marginBottom: '100px' }}>
                    {/* Buscador */}
                    <div className="row mb-4">
                        <div className="col-12 d-flex justify-content-center">
                            <input
                                type="text"
                                className="form-control"
                                style={{ maxWidth: '300px', marginRight: '10px' }}
                                placeholder="Buscar reporte..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-primary me-2" onClick={handleSearch}>
                                Buscar
                            </button>
                            <button className="btn btn-success" title='Consultar Reportes' onClick={handleRefresh}>
                                <FaSyncAlt />
                            </button>
                        </div>
                    </div>
                    <div className="row g-4">
                        {jsonReportesBI.length === 0 ? (
                            Array(4)
                                .fill(0)
                                .map((_, index) => (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                                        <CardSkeleton />
                                    </div>
                                ))
                        ) : filteredReportes.length > 0 ? (
                            filteredReportes.map((item, index) => (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                                    <Card
                                        icono={item.icono}
                                        titulo={item.titulo}
                                        descripcion={item.descripcion}
                                        urlPowerBI={item.urlPowerBI}
                                        colorIcono={item.colorIcono}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-muted mt-3">No se encontraron reportes.</p>
                        )}
                    </div>
                </div>
            </div>

            <BotonFlotante />
        </>
    )
}