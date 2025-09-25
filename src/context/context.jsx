import { createContext, useState, useEffect, useContext } from 'react';
import { IniciarSesion } from '../services/ServicioConsumo';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [configuracionData, setConfiguracionData] = useState([]);


  const getCofiguracion = async ( usuario, password, opcion) => {
    try {
      const jsonLogin = {
        usuario: usuario,
        password: password,
        opcion: '',
      };
      const response = await IniciarSesion(jsonLogin);
      //console.log(response);
      
      if (!response.Error) {
        setConfiguracionData(response.Resultado);
      } else {
        toast.error(response.Mensaje);
      }
    } catch (error) {
      console.log(error);
      console.error('Error al obtener productos:', error.message);
    }
  };



  useEffect(() => {
    // getCofiguracion();
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        configuracionData,
        setConfiguracionData,
        getCofiguracion
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
