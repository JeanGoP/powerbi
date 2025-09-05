import apiClients from './UseIntercept';

const { apiClient, apiClient2 } = apiClients;


export const IniciarSesion = async (data) => {
  try {
    const response = await apiClient.post('login', data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const CambioClave = async (data) => {
  try {
    const response = await apiClient.post('updatePassword', data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};